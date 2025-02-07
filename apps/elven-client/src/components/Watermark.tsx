type RaceType = 'elven' | 'dwarven' | 'human';

interface WatermarkProps {
    race: RaceType;
    color?: string;
    opacity?: number;
    rotation?: number;
    scale?: number;
}

const Watermark: React.FC<WatermarkProps> = ({
    race,
    color = 'currentColor',
    opacity = 0.1,
    rotation = -15,
    scale = 1.5
}) => {
    const symbolId = {
        elven: 'elven-leaf',
        dwarven: 'dwarven-hammer',
        human: 'human-crown',
    }[race];

    return (
        <svg
            className="absolute inset-0 w-full h-full -z-10"
            style={{ color }}
            preserveAspectRatio="xMidYMid"
        >
            <use 
                href={`/watermarks.svg#${symbolId}`}
                width="100%"
                height="100%"
                style={{
                    opacity,
                    transform: `rotate(${rotation}deg) scale(${scale})`,
                    transformOrigin: 'center center',
                }}
            />
        </svg>
    );
}

export default Watermark;
