# 🗡️ **One Backend to Rule Them All**  
*A Journey Through Multi-Tenant Customization Inspired by Middle Earth*

Welcome, traveler! 🌍 This repository is the companion artifact to my **tech talk**:  
**_"One Backend to Rule Them All: Mastering Multi-Tenant Customization"_**.

In this repository, you will find the living code, configurations, and documentation that power **The Ring Network** — a demonstration of how a single backend can serve multiple, uniquely crafted client experiences, just as the **One Ring** binds the diverse realms of Middle Earth.

---

## 🌐 **Table of Contents**

1. [⚡ Overview](#-overview)  
2. [🏗️ Architecture](#-architecture)  
3. [🚀 Getting Started](#-getting-started)  
4. [⚙️ Configuration Guide](#️-configuration-guide)  
5. [🛡️ Troubleshooting & FAQs](#️-troubleshooting--faqs)  
6. [🗂️ Developer Guidelines](#-developer-guidelines)  
7. [📜 License](#-license)

---

## ⚡ **Overview**

This project showcases how to:
- Build **multi-tenant applications** with a unified backend.
- Customize client interfaces without duplicating core logic.
- Manage routing and request handling using **NGINX** and **Docker Compose**.
- Inject personality into tech through thematic storytelling — in this case, Tolkien’s Middle Earth.

You’ll meet four key realms:
- **Elven Client:** Light, elegant, and timeless.
- **Dwarven Client:** Strong, grounded, and robust.
- **Human Client:** Adaptable, balanced, and versatile.
- **Power Client:** The all-seeing eye—overseeing all realms with centralized control.

---

## 🏗️ **Architecture**

### **High-Level Overview**

```
                   +-------------------+
                   |   Reverse Proxy   |
                   |      (NGINX)      |
                   +---------+---------+
                             |
        +--------------------+--------------------+
        |           |               |             |
   Elven Client  Dwarven      Human Client      Power
                 Client                         Client
```

- **Reverse Proxy (NGINX):** Directs traffic to the right client based on the hostname (e.g., `dwarven.ringnetwork.com`).
- **Clients:** Each client has its own flavor but draws from the same API well.
- **Backend (API):** A Node.js service connected to Redis for rapid data access.

---

## 🚀 **Getting Started**

### 1️⃣ **Prerequisites**
- Docker & Docker Compose
- Node.js 22.x

### 2️⃣ **Clone the Repository**

```bash
git clone https://github.com/guahanweb/demo-ring-network.git
cd demo-ring-network
```

### 3️⃣ **Environment Setup**

Examine the `.env` file and update the `NGINX_PORT` to your desired port.

### 4️⃣ **Hosts Configuration**

Edit `/etc/hosts`:

```plaintext
127.0.0.1 dwarven.ringnetwork.com
127.0.0.1 elven.ringnetwork.com
127.0.0.1 human.ringnetwork.com
127.0.0.1 power.ringnetwork.com
```

### 5️⃣ **Run the Network**

Using the provided `dev` script, you can start the network with a single command:

```bash
./dev start
```

Once running, you can update any individual containers by name:

```bash
./dev restart <container_name> # restart with updated env
./dev redeploy <container_name> # rebuild and restart
```

---

## ⚙️ **Configuration Guide**

### **NGINX Setup**

- **Shared Client Configuration:** Manages API proxying and client ID injection.
- **Reverse Proxy:** Routes requests based on hostnames.

### **Dockerfile Overview**

- Generalized with `ARG` for dynamic workspace builds.
- Supports both development and production workflows.

### **Environment Variables**

- Control service bindings and NGINX behavior.

---

## 🛡️ **Troubleshooting & FAQs**

- **Can't bind to port 80?**  
  Run: `sudo pfctl -f /etc/pf.conf && sudo pfctl -e`

- **Hostnames not resolving?**  
  Double-check `/etc/hosts` entries.

---

## 🗂️ **Developer Guidelines**

- **Adding New Realms:**  
  Create a new client folder under `apps/`, update Docker Compose and NGINX configs.

- **Testing Changes:**  
  Use `./dev redeploy <container_name>` to rebuild individual services.

- **Contributing:**  
  Pull requests are welcome! 🗡️
