cd "/Users/keyingguo/Documents/GitHub/p5mirror---kg3171/downloads/../p5projects"
#
echo unzip 1 "PhotoBooth - IMS-7bTAzOws8"
rm -rf "./PhotoBooth - IMS-7bTAzOws8"
mkdir "./PhotoBooth - IMS-7bTAzOws8"
pushd "./PhotoBooth - IMS-7bTAzOws8" > /dev/null
unzip -q "../../downloads/zips/PhotoBooth - IMS-7bTAzOws8"
popd > /dev/null
#
echo unzip 2 "ims06-chlo.-q38GhePJ8"
rm -rf "./ims06-chlo.-q38GhePJ8"
mkdir "./ims06-chlo.-q38GhePJ8"
pushd "./ims06-chlo.-q38GhePJ8" > /dev/null
unzip -q "../../downloads/zips/ims06-chlo.-q38GhePJ8"
popd > /dev/null
#
echo unzip 3 "XPhoto Week 10-XqtIs0y7O"
rm -rf "./XPhoto Week 10-XqtIs0y7O"
mkdir "./XPhoto Week 10-XqtIs0y7O"
pushd "./XPhoto Week 10-XqtIs0y7O" > /dev/null
unzip -q "../../downloads/zips/XPhoto Week 10-XqtIs0y7O"
popd > /dev/null
#
echo unzip 4 "ims06-chlo. copy-FKoVzAN9H"
rm -rf "./ims06-chlo. copy-FKoVzAN9H"
mkdir "./ims06-chlo. copy-FKoVzAN9H"
pushd "./ims06-chlo. copy-FKoVzAN9H" > /dev/null
unzip -q "../../downloads/zips/ims06-chlo. copy-FKoVzAN9H"
popd > /dev/null
#
echo unzip 5 "level 1 final-C1AXypwG2"
rm -rf "./level 1 final-C1AXypwG2"
mkdir "./level 1 final-C1AXypwG2"
pushd "./level 1 final-C1AXypwG2" > /dev/null
unzip -q "../../downloads/zips/level 1 final-C1AXypwG2"
popd > /dev/null
#
echo unzip 6 "level 1-YaAoR6LqD"
rm -rf "./level 1-YaAoR6LqD"
mkdir "./level 1-YaAoR6LqD"
pushd "./level 1-YaAoR6LqD" > /dev/null
unzip -q "../../downloads/zips/level 1-YaAoR6LqD"
popd > /dev/null
#
echo unzip 7 "Level 1 - Love Quest-5AYDZB1Aff"
rm -rf "./Level 1 - Love Quest-5AYDZB1Aff"
mkdir "./Level 1 - Love Quest-5AYDZB1Aff"
pushd "./Level 1 - Love Quest-5AYDZB1Aff" > /dev/null
unzip -q "../../downloads/zips/Level 1 - Love Quest-5AYDZB1Aff"
popd > /dev/null
#
echo unzip 8 "Love Actually Final UI-RVruVKpZZ"
rm -rf "./Love Actually Final UI-RVruVKpZZ"
mkdir "./Love Actually Final UI-RVruVKpZZ"
pushd "./Love Actually Final UI-RVruVKpZZ" > /dev/null
unzip -q "../../downloads/zips/Love Actually Final UI-RVruVKpZZ"
popd > /dev/null
#
echo unzip 9 "Love Actually copy copy copy-SmCruYZS3"
rm -rf "./Love Actually copy copy copy-SmCruYZS3"
mkdir "./Love Actually copy copy copy-SmCruYZS3"
pushd "./Love Actually copy copy copy-SmCruYZS3" > /dev/null
unzip -q "../../downloads/zips/Love Actually copy copy copy-SmCruYZS3"
popd > /dev/null
#
echo unzip 10 "Love Actually copy-HDsCS35f"
rm -rf "./Love Actually copy-HDsCS35f"
mkdir "./Love Actually copy-HDsCS35f"
pushd "./Love Actually copy-HDsCS35f" > /dev/null
unzip -q "../../downloads/zips/Love Actually copy-HDsCS35f"
popd > /dev/null
#
echo unzip 11 "Love Actually copy-2HyxKnebd"
rm -rf "./Love Actually copy-2HyxKnebd"
mkdir "./Love Actually copy-2HyxKnebd"
pushd "./Love Actually copy-2HyxKnebd" > /dev/null
unzip -q "../../downloads/zips/Love Actually copy-2HyxKnebd"
popd > /dev/null
#
echo unzip 12 "Love Quest-C95Ii3IUO"
rm -rf "./Love Quest-C95Ii3IUO"
mkdir "./Love Quest-C95Ii3IUO"
pushd "./Love Quest-C95Ii3IUO" > /dev/null
unzip -q "../../downloads/zips/Love Quest-C95Ii3IUO"
popd > /dev/null
#
echo unzip 13 "Love Actually-Yz2gdVhil"
rm -rf "./Love Actually-Yz2gdVhil"
mkdir "./Love Actually-Yz2gdVhil"
pushd "./Love Actually-Yz2gdVhil" > /dev/null
unzip -q "../../downloads/zips/Love Actually-Yz2gdVhil"
popd > /dev/null
#
echo unzip 14 "ims05-chlo.-wRGzcNFRu"
rm -rf "./ims05-chlo.-wRGzcNFRu"
mkdir "./ims05-chlo.-wRGzcNFRu"
pushd "./ims05-chlo.-wRGzcNFRu" > /dev/null
unzip -q "../../downloads/zips/ims05-chlo.-wRGzcNFRu"
popd > /dev/null

cd ..
# remove redundant p5.js p5.sound.min.js
rm -f p5projects/*/p5.*
# sync last_updatedAt.txt
cd downloads/json
if [ -e pending_updatedAt.txt ]; then
  rm -f last_updatedAt.txt
  mv pending_updatedAt.txt last_updatedAt.txt
fi