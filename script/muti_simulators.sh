#!/bin/bash
declare -a simulators=("000E0AC2-1EF2-4BFC-8775-8831E8ED6205" "9FEA3E8B-A9BC-43E1-8CF9-472377C300BF" "0162A4E7-3DD9-455F-AFC8-20EF7C34D447")

for i in "${simulators[@]}"
do
    xcrun instruments -w $i
    xcrun simctl install $i ~/.expo/ios-simulator-app-cache/Exponent-2.9.0.app
    xcrun simctl openurl $i exp://127.0.0.1:19000   
done