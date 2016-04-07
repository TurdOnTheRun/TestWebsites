#!/bin/bash
for num in {0..100}; do
    cd $num
    mv *.htm $num.htm
    mv *.html $num.html
    cd ..
done
