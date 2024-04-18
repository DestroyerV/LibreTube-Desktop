import "./player.css";
import { generateStoryboard } from "../../utils/generateStoryboard";
import { chaptersVtt } from "../../utils/chapter";

import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import React from "react";

export function Player({ videoDetail }: { videoDetail: any }) {
  const { hls, title, thumbnailUrl, previewFrames } = videoDetail;

  function parseChapters(videoDetail: any) {
    if (!videoDetail?.chapters) return;
    let chapters = [];
    for (let i = 0; i < videoDetail.chapters.length; i++) {
      const chapter = videoDetail.chapters[i];
      const name = chapter.title;
      // seconds to 00:00:00
      const timestamp = new Date(chapter.start * 1000)
        .toISOString()
        .slice(11, 22);
      const seconds =
        videoDetail.chapters[i + 1]?.start - chapter.start ??
        videoDetail.duration - chapter.start;
      chapters.push({ name, timestamp, seconds });
    }
    return chaptersVtt(chapters, videoDetail.duration);
  }
  return (
    <>
      <MediaPlayer
        className='player'
        title={title}
        src={hls}
        crossOrigin
        playsInline
      >
        <MediaProvider>
          <Poster className='vds-poster' src={thumbnailUrl} alt={title} />
          <Track
            src={parseChapters(videoDetail)}
            kind='chapters'
            label='English'
            lang='en-US'
            default
          />
        </MediaProvider>

        {/* Layouts */}
        <DefaultVideoLayout
          icons={defaultLayoutIcons}
          thumbnails={generateStoryboard(previewFrames[1])}
        />
      </MediaPlayer>
    </>
  );
}
