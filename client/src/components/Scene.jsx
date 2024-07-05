import  { useRef, useEffect } from "react";
import Matter from "matter-js";

const Scene = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const { Engine, Render, Runner, Bodies, Composite, MouseConstraint, Mouse, World, Events } = Matter;

  const noteRelatedWords = [
    "Creativity", "Tasks", "Project", "Deadline", "Collaboration",
    "Organization", "Productivity", "Prioritize", "Objectives", "Goals",
    "Brainstorming", "Checklist", "Workflow", "Milestone", "Strategy",
  ];

  // Fonction pour initialiser la scène
  const initScene = () => {
    // Nettoyer l'instance de scène précédente si elle existe
    if (engineRef.current) {
      Render.stop(renderRef.current);
      Engine.clear(engineRef.current);
      renderRef.current.canvas.remove();
    }

    // Créer une nouvelle instance du moteur
    const engine = Engine.create();
    engineRef.current = engine;

    // Récupérer le monde du moteur
    const world = engine.world;

    // Créer un renderer pour cette scène
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: 400,
        background: 'transparent',
        wireframes: false,
      },
    });
    renderRef.current = render;

    // Créer des rectangles avec des positions aléatoires
    noteRelatedWords.forEach((word) => {
      const rect = Bodies.rectangle(
        Math.floor(Math.random() * window.innerWidth),
        -200,
        100,
        60,
        {
          render: {
            fillStyle: 'white',
          },
          label: word,
        }
      );
      World.add(world, rect);
    });

    // Créer des murs statiques
    const wallLeft = Bodies.rectangle(-80, 200, 160, 400, { isStatic: true , render: { fillStyle: 'white' }});
    const wallRight = Bodies.rectangle(window.innerWidth + 80, 200, 160, 400, { isStatic: true, render: { fillStyle: 'white' } });
    const ground = Bodies.rectangle(window.innerWidth / 2, 350, window.innerWidth, 1, { isStatic: true, render: { fillStyle: 'white' } });

    // Ajouter tous les corps au monde
    Composite.add(world, [wallLeft, wallRight, ground]);

    // Exécuter le renderer
    Render.run(render);

    // Créer le runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.9,
        render: { visible: false },
      },
    });

    Composite.add(world, mouseConstraint);

    // Custom rendering pour dessiner des rectangles arrondis et du texte sur chaque rectangle
    Events.on(render, 'afterRender', () => {
      const context = render.context;
      context.font = '16px Arial';
      context.fillStyle = 'black';
      context.lineWidth = 3;
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      Composite.allBodies(engine.world).forEach((body) => {
        if (body.label && noteRelatedWords.includes(body.label)) {
          context.save();
          context.translate(body.position.x, body.position.y);
          context.rotate(body.angle);

          // Dessiner un rectangle arrondi
          const width = 120;
          const height = 40;
          const radius = 20;

          context.beginPath();
          context.lineTo(width / 2 - radius, -height / 2);
          context.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
          context.lineTo(width / 2, height / 2 - radius);
          context.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
          context.lineTo(-width / 2 + radius, height / 2);
          context.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
          context.lineTo(-width / 2, -height / 2 + radius);
          context.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);
          context.closePath();
          context.stroke();

          // Dessiner du texte
          context.fillText(body.label, 0 , 0);
          context.restore();
        }
      });
    });
  };

  // Appeler initScene une fois au chargement initial
  useEffect(() => {
    initScene();

    // Nettoyer la scène lors du démontage du composant
    return () => {
      if (engineRef.current) {
        Render.stop(renderRef.current);
        Engine.clear(engineRef.current);
        renderRef.current.canvas.remove();
      }
    };
  }, []);

  // Gérer le redimensionnement de la fenêtre pour réinitialiser la scène
  useEffect(() => {
    const handleResize = () => {
        initScene();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div className="hidden md:block w-full" ref={sceneRef} />;
};

export default Scene;
