# ASCII_video_transform

Webcam ASCII Video creator

## Exporting ASCII video

Use the **Start Recording** button to begin capturing the canvas. Once you are
ready to finish, press **Stop Recording** and a `ascii_video.webm` file will be
downloaded containing the recording of the ASCII render, including audio from
the webcam if permission is granted.

## Video cache

After recording, the resulting video is also stored in the browser's
`IndexedDB` database (`asciiVideoCache`). This cache can hold the latest
recording so it can be retrieved later even if the page is reloaded.
