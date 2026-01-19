import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Bara Zalat Monogram';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 20,
          background: '#09090b', // Matches your zinc-950/900 theme
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#818cf8', // Matches your indigo-400 theme
          fontWeight: 800,
          borderRadius: '4px',
          border: '1px solid #3f3f46',
        }}
      >
        BZ
      </div>
    ),
    {
      ...size,
    }
  );
}