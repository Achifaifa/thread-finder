# Thread colour tool

Relates DMC, Anchor and Güttermann thread colour numbers with RGB and hex.

I've been chasing manufacturers for actual colour data for years. The only one who replied was DMC, and they sent me a PDF copy of a 10 year old post in an abandoned third party blog. I've completely given up on this.  
  
The code is functional, but there is no data to make it useful, unless you want to relate RGB/HEX to DMC. Take the results with a grain of salt, some of the colours in the data I was sent are just wrong. Good luck.  


## How to use 

type the thread colour number or the colour value and click the button. Conversions will show below.

## Disclaimers

* Colour closeness is calculated by minimizing the euclidean distance between points in RGB space, which may not yield the closest colour as perceived by humans.

* Data was provided by manufacturers in June 2023, but may be incomplete or outdated. 

* Always check the manufacturer and retailer images before purchasing any colour.

## Raw data

Data was sent by manufacturers in various formats, then OCRd and converted to JSON. `/ref` contains the data I was sent and the OCRd conversions in CSV format, and `/data` the JSON files used by the website. 
