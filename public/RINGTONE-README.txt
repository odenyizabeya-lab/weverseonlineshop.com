RINGTONE AUDIO — HOW TO USE YOUR OWN SOUND
==========================================

To make the call button ring with your OWN real audio (a calm song, an
instrumental, a phone-ring sound), do this:

1. Take your audio file (MP3, WAV, OGG, or M4A).
2. Put it in this folder (public/) and name it EXACTLY one of these:

       ringtone.mp3     <-- recommended (smallest, most compatible)
       ringtone.wav
       ringtone.ogg
       ringtone.m4a

   Example:  public/ringtone.mp3

3. Rebuild the site and redeploy (npm run build, then vercel --prod).

The live site will play your file while a call is "ringing" (~2.5 seconds
of ring before the representative picks up). The sound loops until pick-up.

NOTES
- Keep the file short and low-volume so it sounds like a gentle ring,
  not loud music. 3-8 seconds is ideal (it loops).
- If NO ringtone file is present, the site plays a soft built-in melody,
  so calls always ring even if you haven't added one yet.
- There is nothing to change in the code — just drop the file here,
  rebuild, and redeploy.
