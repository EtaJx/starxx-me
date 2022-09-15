echo "building..."
yarn build
echo "connecting 27.122.58.108"
scp -r .next/ root@27.122.58.108:/root/nextjs-personal/.next/
scp -r ./dist root@27.122.58.108:/root/nextjs-personal/dist/
echo "deploying"
