import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'PokePicker — Random Pokemon Picker'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Image generation
export default async function Image() {
  const typeDotColors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7']

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #f43f5e 0%, #8b5cf6 100%)',
          padding: 80,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Decorative type-color dots (top row) */}
        <div
          style={{
            display: 'flex',
            gap: 22,
            alignItems: 'center',
          }}
        >
          {typeDotColors.map((color) => (
            <div
              key={color}
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: color,
                display: 'flex',
                boxShadow: '0 4px 14px rgba(0,0,0,0.30)',
              }}
            />
          ))}
        </div>

        {/* Centered title block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 150,
              fontWeight: 800,
              color: 'white',
              letterSpacing: -5,
              lineHeight: 1,
              display: 'flex',
              textShadow: '0 4px 24px rgba(0,0,0,0.25)',
            }}
          >
            PokePicker
          </div>
          <div
            style={{
              fontSize: 38,
              color: 'rgba(255,255,255,0.96)',
              marginTop: 28,
              textAlign: 'center',
              display: 'flex',
              maxWidth: 1000,
            }}
          >
            Random Pokemon Picker — Pick Any of 1025 Pokémon
          </div>
        </div>

        {/* Bottom domain */}
        <div
          style={{
            fontSize: 26,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: 1.5,
            display: 'flex',
          }}
        >
          www.pokepicker.app
        </div>
      </div>
    ),
    { ...size }
  )
}
