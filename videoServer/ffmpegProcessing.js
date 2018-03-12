let ffmpeg = require('fluent-ffmpeg');

export function process(videoName, format) {

    let pathToVideo = 'videos/' + videoName + '.' + format;

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

    ffmpegProcess(resolution360p, pathToVideo, videoName, '360');
    ffmpegProcess(resolution480p, pathToVideo, videoName, '480');
    ffmpegProcess(resolution720p, pathToVideo, videoName, '720');
    ffmpegProcess(resolution1080p, pathToVideo, videoName, '1080');

}

function ffmpegProcess(options, pathToVideo, videoName, resolution) {

    ffmpeg(pathToVideo).addOptions(options).on('end', function() {
        console.log('file has been converted succesfully');
    }).on('error', function(err) {
        console.log('an error happened: ' + err.message);
    }).output('streams/' + videoName + '/' + videoName + '_' + resolution +
        '.m3u8').run();

}
