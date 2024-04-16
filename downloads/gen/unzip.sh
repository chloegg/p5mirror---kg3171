cd "/Users/keyingguo/Documents/GitHub/p5mirror---kg3171/downloads/../p5projects"
#
echo unzip 1 "XPhoto Week 10-XqtIs0y7O"
rm -rf "./XPhoto Week 10-XqtIs0y7O"
mkdir "./XPhoto Week 10-XqtIs0y7O"
pushd "./XPhoto Week 10-XqtIs0y7O" > /dev/null
unzip -q "../../downloads/zips/XPhoto Week 10-XqtIs0y7O"
popd > /dev/null
#
echo unzip 2 "ims04-chlo.-4sp9J0yL-f"
rm -rf "./ims04-chlo.-4sp9J0yL-f"
mkdir "./ims04-chlo.-4sp9J0yL-f"
pushd "./ims04-chlo.-4sp9J0yL-f" > /dev/null
unzip -q "../../downloads/zips/ims04-chlo.-4sp9J0yL-f"
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