"use client"

export function AnimationKeyframes() {
  return (
    <style jsx global>{`
      @keyframes subtleZoom {
        0% {
          transform: scale(1.02);
        }
        100% {
          transform: scale(1.08);
        }
      }
    `}</style>
  )
}