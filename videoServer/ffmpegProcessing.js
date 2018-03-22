let ffmpeg = require('fluent-ffmpeg');

let fs = require('fs');

export function process(videoName, format, id) {

    let pathToVideo = 'videos/' + videoName + '.' + format;

    let pathStreams = 'streams/' + id + "_" + videoName;

    if (fs.existsSync(pathStreams)) {
        return;
    }

    fs.mkdir(pathStreams);

    let playlist = "#EXTM3U\n" +
        "#EXT-X-VERSION:3\n" +
        "#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360\n" +
        videoName + "_360.m3u8\n" +
        "#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=842x480\n" +
        videoName + "_480.m3u8\n" +
        "#EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x720\n" +
        videoName + "_720.m3u8\n" +
        "#EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080\n" +
        videoName + "_1080.m3u8";

    fs.writeFile(pathStreams + "/playlist.m3u8", playlist);

    let resolution360p = [
        '-vf scale=w=640:h=360:force_original_aspect_ratio=decrease',
        '-c:a aac',
        '-ar 48000',
        '-c:v h264',
        '-profile:v main',
        '-crf 20',
        '-sc_threshold 0',
        '-g 48',
        '-keyint_min 48',
        '-hls_time 4',
        '-hls_playlist_type vod',
        '-b:v 800k',
        '-maxrate 856k',
        '-bufsize 1200k',
        '-b:a 96k',
        //'-hls_segment_filename ' + videoName + '_360p_%03d.ts ' + videoName + '_360p.m3u8'

    ];

    let resolution480p = [
        '-vf scale=w=842:h=480:force_original_aspect_ratio=decrease',
        '-c:a aac',
        '-ar 48000',
        '-c:v h264',
        '-profile:v main',
        '-crf 20',
        '-sc_threshold 0',
        '-g 48',
        '-keyint_min 48',
        '-hls_time 4',
        '-hls_playlist_type vod',
        '-b:v 1400k',
        '-maxrate 1498k',
        '-bufsize 2100k',
        '-b:a 128k',
        //'-hls_segment_filename ' + videoName + '_480p_%03d.ts ' + videoName + '_480p.m3u8'
    ];

    let resolution720p = [
        '-vf scale=w=1280:h=720:force_original_aspect_ratio=decrease',
        '-c:a aac',
        '-ar 48000',
        '-c:v h264',
        '-profile:v main',
        '-crf 20',
        '-sc_threshold 0',
        '-g 48',
        '-keyint_min 48',
        '-hls_time 4',
        '-hls_playlist_type vod',
        '-b:v 2800k',
        '-maxrate 2996k',
        '-bufsize 4200k',
        '-b:a 128k',
        //'-hls_segment_filename ' + videoName + '_720p_%03d.ts ' + videoName + '_720p.m3u8'

    ];

    let resolution1080p = [
        '-vf scale=w=1920:h=1080:force_original_aspect_ratio=decrease',
        '-c:a aac',
        '-ar 48000',
        '-c:v h264',
        '-profile:v main',
        '-crf 20',
        '-sc_threshold 0',
        '-g 48',
        '-keyint_min 48',
        '-hls_time 4',
        '-hls_playlist_type vod',
        '-b:v 5000k',
        '-maxrate 5350k',
        '-bufsize 7500k',
        '-b:a 192k',
        //'-hls_segment_filename ' + videoName + '_1080p_%03d.ts ' + videoName + '_1080p.m3u8'
    ];

    ffmpegProcess(resolution360p, pathToVideo, pathStreams, videoName, '360', false);
    ffmpegProcess(resolution480p, pathToVideo, pathStreams, videoName, '480', false);
    ffmpegProcess(resolution720p, pathToVideo, pathStreams, videoName, '720', false);
    ffmpegProcess(resolution1080p, pathToVideo, pathStreams, videoName, '1080', true);

}

function ffmpegProcess(options, pathToVideo, pathStreams, videoName, resolution, last) {

    let output = pathStreams + '/' + videoName + '_' + resolution + '.m3u8';

    ffmpeg(pathToVideo).addOptions(options).on('end', function() {
        console.log('file has been converted succesfully');

        if (last) {
            fs.unlink(pathToVideo);
        }


    }).on('error', function(err) {
        console.log('an error happened: ' + err.message);
    }).output(output).run();

}
