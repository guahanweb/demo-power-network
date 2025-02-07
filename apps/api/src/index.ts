// src/index.ts

import fs from 'fs';
import path from 'path';
import { default as express, Request, Response } from 'express';
import { reqHeaderClient } from './middlewares/req-header-client';
import { reqSessionUser } from './middlewares/req-session-user';
import { PreferenceService } from './services/preferences';
import { Preference, ClientPreferenceOverride } from './models/preferences';

if (require.main === module) {
  main();
}

async function main() {
  await bootstrap();

  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(express.json());

  app.use(reqSessionUser({ userId: 'ringnetwork-demo-user' }));

  // Middleware to set the client ID from the request header
  app.use(reqHeaderClient({
    header: 'x-client-id',
    defaultClient: 'power',
    allowedValues: ['elven', 'dwarven', 'human', 'power'],
  }));

  app.get('/service-status', (req: Request, res: Response) => {
    res.type('text/plain');
    res.send('HEALTHY');
  });

  app.post('/preferences', async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const clientId = res.locals.clientId;
    const preferences = req.body;
    const clientPrefs = await PreferenceService.getClientPreferences(clientId);

    // only update preferences that are defined for the client
    const promises = [];
    for (const [prefId, value] of Object.entries(preferences)) {
      if (Object.keys(clientPrefs).includes(prefId)) {
        promises.push(PreferenceService.updateUserPreference(userId, prefId, value as boolean));
      }
    }

    await Promise.all(promises);
    res.json({ success: true });
  });

  app.get('/preferences', async (req: Request, res: Response) => {
    const clientId = res.locals.clientId;
    const userId = res.locals.userId;

    if (clientId === 'power') {
      const userPreferences = await PreferenceService.getUserPreferences(userId);
      const preferences: Record<string, Record<string, Preference>> = {
        global: await PreferenceService.getGlobalPreferences(true),
        elven: await PreferenceService.getClientOnlyPreferences('elven'),
        dwarven: await PreferenceService.getClientOnlyPreferences('dwarven'),
        human: await PreferenceService.getClientOnlyPreferences('human'),
      };

      // Apply the user preferences to the objects
      for (const [prefId, value] of Object.entries(userPreferences)) {
        Object.keys(preferences).forEach(client => {
          if (Object.keys(preferences[client]).includes(prefId)) {
            preferences[client][prefId] = {
              ...preferences[client][prefId],
              enabled: value,
            };
          }
        });
      }

      res.json(preferences);
    } else {
      const preferences = await PreferenceService.getClientPreferences(clientId);
      const userPreferences = await PreferenceService.getUserPreferences(userId, clientId);

      // be sure we apply user values to the client preferences
      for (const [prefId, value] of Object.entries(userPreferences)) {
        preferences[prefId] = {
          ...preferences[prefId],
          enabled: value,
        };
      }

      res.json(preferences);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

async function bootstrap() {
  // Load Global Preferences
  const globalPreferencesPath = path.join(__dirname, '..', '__data', 'global-preferences.json');
  const globalData = JSON.parse(fs.readFileSync(globalPreferencesPath, 'utf8'));
  for (const [id, pref] of Object.entries(globalData)) {
    await PreferenceService.updateGlobalPreference(id, pref as Preference);
  }

  // Load Client Preferences
  const clientsDir = path.join(__dirname, '..', '__data', 'clients');
  const clientFiles = fs.readdirSync(clientsDir);

  for (const file of clientFiles) {
    const clientData = JSON.parse(fs.readFileSync(path.join(clientsDir, file), 'utf8'));
    const clientId = path.basename(file, '.json');

    for (const [id, pref] of Object.entries(clientData.preferences)) {
      await PreferenceService.updateClientPreference(clientId, id, pref as ClientPreferenceOverride);
    }
  }
}
