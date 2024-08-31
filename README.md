## Image processing 

## Description
* An API that takes an image of a passport and extract key information and returns it in response

## How to use
* yarn install 
* copy .env.example to -env file 
* provide all necessary envs
* yarn start
* `` curl --location --request GET 'http://localhost:3000/image-processor/passport' \
  --form 'file=@"passport_us.png"' ``

## Libraries
* Nestjs for the project
* opencv for image processing
* aws textract
* google vision


## Useful links
* Project structure using [Hexagonal](https://romanglushach.medium.com/hexagonal-architecture-the-secret-to-scalable-and-maintainable-code-for-modern-software-d345fdb47347) architecture
