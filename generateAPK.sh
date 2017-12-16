#!/bin/bash
clear
echo "Building ..."
ionic cordova build --release android

echo "Signing ..."
cd platforms/android/build/outputs/apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore DailyRude.keystore android-release-unsigned.apk DailyRude

cd platforms/android/build/outputs/apk/
echo "Moving ..."
mv android-release-unsigned.apk ../../../../../../../../Library/Android/sdk/build-tools/26.0.0/

cd ~/Library/Android/sdk/build-tools/26.0.0

echo "Zipping ..."
./zipalign -v 4 android-release-unsigned.apk DailyRude.apk

echo "Moving ..."
mv DailyRude.apk ../../../../../Desktop

echo "Done ..."