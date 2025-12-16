import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d';
import { useNavigate } from 'react-router-dom';

interface Document {
    id: number;
    title: string;
    description: string;
    created_at: string;
    tags: string;
    owner_id: number;
}

interface NeuralBackgroundProps {
    documents: Document[];
}

interface GraphNode {
    id: string | number;
    name: string;
    group: number;
    val: number;
    vx?: number;
    vy?: number;
    x?: number;
    y?: number;
}

interface GraphLink {
    source: string | number | GraphNode;
    target: string | number | GraphNode;
}

interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}

const NeuralBackground: React.FC<NeuralBackgroundProps> = ({ documents }) => {
    const navigate = useNavigate();
    const graphRef = useRef<ForceGraphMethods | undefined>(undefined);
    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: 600 });

    useEffect(() => {
        // Generate nodes from documents
        let nodes: GraphNode[] = documents.map(doc => ({
            id: doc.id,
            name: doc.title,
            group: doc.owner_id, // Color by owner
            val: 3 // Smaller size (was 10)
        }));

        // If no documents, create a "Constellation" of dummy nodes so the view isn't empty
        if (nodes.length === 0) {
            const seeds: GraphNode[] = Array.from({ length: 30 }, (_, i) => ({ // Increased count to 30
                id: `seed-${i}`,
                name: 'Neural Node',
                group: Math.floor(Math.random() * 5), // Random groups for colors
                val: 2 + Math.random() * 3
            }));
            nodes = seeds;
        }

        // Generate links (connect everything to everything lightly, or random connections)
        const links: GraphLink[] = [];

        if (nodes.length > 0) {
            for (let i = 0; i < nodes.length; i++) {
                // Connect to random neighbors
                const target1 = nodes[Math.floor(Math.random() * nodes.length)].id;
                const target2 = nodes[Math.floor(Math.random() * nodes.length)].id;

                if (nodes[i].id !== target1) links.push({ source: nodes[i].id, target: target1 });
                if (nodes[i].id !== target2) links.push({ source: nodes[i].id, target: target2 });
            }
        }

        setGraphData({ nodes, links });
    }, [documents]);

    useEffect(() => {
        const handleResize = () => {
            setDimensions({ width: window.innerWidth, height: 600 });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const colors = ['#7042f8', '#00f6ff', '#ff00ff', '#2196f3', '#ffffff'];

    useEffect(() => {
        if (graphRef.current) {
            // Add a custom force to keep nodes moving gently
            graphRef.current.d3Force('charge')?.strength(-20); // Gentle repulsion
            graphRef.current.d3Force('link')?.distance(50); // Looser links
        }
    }, [graphData]);

    return (
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-auto">
            <ForceGraph2D
                ref={graphRef}
                width={dimensions.width}
                height={dimensions.height}
                graphData={graphData}
                nodeLabel="name"
                nodeColor={(node: any) => colors[(node as GraphNode).group % colors.length]}
                nodeRelSize={4}
                linkColor={() => 'rgba(255, 255, 255, 0.15)'}
                backgroundColor="rgba(0,0,0,0)"
                onNodeClick={(node: any) => {
                    navigate(`/note/${(node as GraphNode).id}`);
                }}
                enableNodeDrag={true}
                enableZoomInteraction={false}
                enablePanInteraction={false}

                // Physics setup for perpetual motion
                d3AlphaDecay={0} // NEVER COOL DOWN. Keeps alpha at 1.
                d3VelocityDecay={0.08} // Very low friction -> Drifts like in space
                onEngineTick={() => {
                    // Constant "wind" drift
                    if (graphRef.current) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const nodes = (graphRef.current as any).graphData().nodes as GraphNode[];
                        nodes.forEach((node) => {
                            if (node.vx !== undefined && node.vy !== undefined) {
                                node.vx += (Math.random() - 0.5) * 0.02;
                                node.vy += (Math.random() - 0.5) * 0.02;
                            }
                        });
                    }
                }}
            />
            {/* Gradient Overlay to fade into bottom content */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] pointer-events-none"></div>
        </div>
    );
};

export default NeuralBackground;
