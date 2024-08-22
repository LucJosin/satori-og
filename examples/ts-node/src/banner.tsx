import { ReactNode } from 'react';

export default function banner(opts: Record<string, string>): ReactNode {
  const { title, description, descriptionFontSize } = opts;
  const [first, second] = title!.split(' ');
  const splittedTitle = first!.split('');
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(30deg, #0e2024, #292b3c, #0e2024)',
        fontSize: '2.3em',
        fontWeight: 600,
        color: 'white',
        padding: '1rem',
        gap: '1rem',
      }}>
      <div
        style={{
          height: '100%',
          width: '100%',
          border: '2px solid #ffffff80',
          borderRadius: '30px',
          position: 'absolute',
          textTransform: 'uppercase',
        }}></div>
      <div
        style={{
          height: 'auto',
          width: '100%',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '2rem 0 0 ',
        }}>
        {splittedTitle.map((letter, index) => {
          return (
            <h1
              key={index}
              style={{
                height: '100px',
                width: '100px',
                border: '2px solid #ffffff80',
                borderRadius: '30px',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0',
                textTransform: 'uppercase',
              }}>
              {letter}
            </h1>
          );
        })}
        <h1
          style={{
            height: '100px',
            width: '30px',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0',
            textTransform: 'uppercase',
          }}>
          -
        </h1>
        <h1
          style={{
            height: '100px',
            width: '140px',
            border: '4px solid #292b3c80',
            borderRadius: '30px',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            color: '#292b3c',
            margin: '0',
            textTransform: 'uppercase',
          }}>
          {second}
        </h1>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: descriptionFontSize || '0.6em',
        }}>
        {description}
      </p>
    </div>
  );
}
