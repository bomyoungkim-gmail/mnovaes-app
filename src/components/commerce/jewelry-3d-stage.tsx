"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";

function JewelryModel({ modelPath }: { modelPath: string }) {
  const gltf = useGLTF(modelPath);
  return <primitive object={gltf.scene} scale={1.7} position={[0, -0.1, 0]} />;
}

function StageFallback() {
  return <div className="h-[380px] animate-pulse bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.9),rgba(232,228,220,0.65),rgba(220,214,203,0.45))]" />;
}

type Jewelry3DStageProps = {
  modelPath?: string;
};

export function Jewelry3DStage({ modelPath = "/models/jewelry-stage.glb" }: Jewelry3DStageProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border border-latelier-charcoal/10 bg-[#efede8]">
      <div className="border-b border-latelier-charcoal/10 p-4 md:px-6 md:py-5">
        <p className="text-xs uppercase tracking-editorial text-latelier-charcoal/60">Jewelry 3D Stage</p>
        <h2 className="mt-1 font-serif text-4xl leading-none md:text-5xl">Visualização Imersiva</h2>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        className="relative h-[380px] overflow-hidden"
      >
        <Suspense fallback={<StageFallback />}>
          <Canvas camera={{ position: [0, 0.35, 3], fov: 38 }}>
            <ambientLight intensity={0.75} />
            <directionalLight position={[3, 5, 2]} intensity={2.2} />
            <directionalLight position={[-2, 2, -3]} intensity={1.2} />
            <JewelryModel modelPath={modelPath} />
            <Environment preset="city" />
            <OrbitControls enablePan={false} minDistance={1.8} maxDistance={4.5} autoRotate={!reduceMotion} autoRotateSpeed={0.9} />
          </Canvas>
        </Suspense>
      </motion.div>
    </section>
  );
}

useGLTF.preload("/models/jewelry-stage.glb");

