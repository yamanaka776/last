import satori from 'satori'
import sharp from 'sharp'

export async function getOgImage(text: string) {
  const fontData = (await getFontData()) as ArrayBuffer
  const svg = await satori(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: 'rgb(55,65,81)',
        fontWeight: 600,
        padding: 48,
        border: '48px solid rgb(31,41,55)',
      }}
    >
      <div style={{ color: '#fff', fontSize: 64, maxWidth: 1000 }}>{text}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{
            color: '#d1d5db',
            fontSize: 48,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          耳日記
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans JP',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  )

  return await sharp(Buffer.from(svg)).png().toBuffer()
}

async function getFontData() {
  const API = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700'

  const css = await (
    await fetch(API, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })
  ).text()

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (!resource) return

  return await fetch(resource[1]).then((res) => res.arrayBuffer())
}
