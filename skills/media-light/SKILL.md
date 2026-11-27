# Media Light — lighten images, videos, animations, and GIFs without losing quality

Use when an image or video is too heavy.

One job: make media files smaller so the page loads fast, without the picture or the motion looking worse.

## Why media gets heavy

A photo straight from a phone is 3,000 or 4,000 pixels wide. A video is shot in 4K. A GIF holds every frame as a full picture. The page only shows a fraction of that, but the browser still downloads all of it. The media ends up heavier than the page itself.

## Images

- Serve the size the screen shows. Do not serve a 4,000 pixel image for an 800 pixel display. Resize to the display width, plus a little for sharp screens.
- Use a modern format. WebP is smaller than JPEG or PNG at the same quality. AVIF is smaller still where the browser supports it. Keep a JPEG or PNG fallback for old browsers.
- Compress, but do not over-compress. Pick the compression level where the picture still looks clean at full size. If edges smudge or flat color bands, back off.
- Lazy load. Load an image when the reader scrolls to it, not all at once on page load. The first screen loads fast, the rest loads as needed.

## Videos

- Compress the video. MP4 with H.264 plays everywhere. H.265 or WebM is smaller where the browser supports it.
- Serve the resolution the screen shows. Do not serve 4K for a 720p display. Pick the bitrate that keeps the picture clean without wasting bytes.
- Keep it short. Cut what the viewer does not need. A short clip loads fast and holds attention.
- Show a poster image first. Load the video when the viewer taps play or scrolls to it, not on page load.

## Animations

- Use CSS, not video. A fade, a slide, a spin, a pulse — CSS does it in code, no file to download, so it stays light.
- If the motion needs video, keep it short and compressed, like any other video.
- Never animate with a heavy file when a few lines of CSS do the same job.

## GIFs

- Do not use a GIF for an animation when a video or CSS animation will do. A GIF is heavy, large file size, poor quality, no sound. A video of the same animation is much smaller and looks better.
- Convert a GIF to video (MP4 or WebM). Same motion, much smaller file, better quality.
- Replace a simple GIF with CSS when the motion is simple — a spinner, a fade, a slide.
- If a GIF is the only option, keep it short, small in dimensions, few frames, and compress it.

## How to know it worked

- Check the file size before and after. The lighter file should be much smaller.
- Look at the picture or watch the motion at full size. If it looks the same as before, the quality held. If it looks worse, back off the compression.
- Load the page. It should feel fast. The media should not be the slowest part of the page.

## Never

- Never serve a bigger file than the screen shows.
- Never use a GIF when a video or CSS animation does the same job smaller.
- Never compress so far that the picture or the motion looks worse.
- Never load all media at once when the reader only sees the first screen.
