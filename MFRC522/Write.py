#!/usr/bin/env python

import RPi.GPIO as GPIO
import SimpleMFRC522
import sys

reader = SimpleMFRC522.SimpleMFRC522()

try:
	reader.write(str(sys.argv[1]))
        print("after write")
#	print "\n".join(sys.argv)
#     	text = raw_input('New data:')
#        print("Now place your tag to write")
#        reader.write(text)
#        print("Written")
finally:
        GPIO.cleanup()
