import dlib
from matplotlib import pyplot as plt
import face_recognition
import cv2
import numpy as np
from PIL import Image, ImageDraw

from google.colab import files

uploaded = files.upload()

landmarks = None

def get_y_extremes(tuples):
	miny = tuples[0][1]
	maxy = tuples[0][1]
	for (x, y) in tuples:
		if y < miny:
			miny = y
		if y > maxy:
			maxy =y
	return miny, maxy

def get_x_extremes(tuples):
	minx = tuples[0][0]
	maxx = tuples[0][0]
	for (x, y) in tuples:
		if x < minx:
			minx = x
		if x > maxx:
			maxx =x
	return minx, maxx

def load_image(fname):
	img = cv2.imread(fname)
	return cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

def anonymize_eyes(image):
	#width of the image.
	minx = 0
	maxx = image.shape[1]

	#height
	miny, maxbrow = get_y_extremes(landmarks['left_eyebrow'])
	mineye, maxy = get_y_extremes(landmarks['left_eye'])

	#return a filled value.
	return cv2.rectangle(image, (minx, miny), (maxx, maxy), (0, 0, 0), -1)

def extract_face(image, border):
  '''
  extract face from image
  '''
	faces = face_recognition.face_locations(image)
	(x1, y1, x2, y2) = faces[0]
	cropped = image[min(x1, x2) - border:max(x1, x2) + border, min(y1,y2) - border:max(y1,y2)+ border]
	return cropped

def anonymize_feature(image, feature, deltax, deltay):
  minx, maxx = get_x_extremes(landmarks[feature])
  miny, maxy = get_y_extremes(landmarks[feature])
  return cv2.rectangle(image, (minx - deltax, miny - deltay), (maxx + deltax, maxy + deltay), (0,0,0), -1) # 2
  


def anonymize_lips(image):
	tmx, tmxx = get_x_extremes(landmarks['top_lip'])
	bmx, bmxx = get_x_extremes(landmarks['bottom_lip'])

	miny, _ = get_y_extremes(landmarks['top_lip'])
	_, maxy = get_y_extremes(landmarks['bottom_lip'])

	return cv2.rectangle(image, (min(tmx, bmx), miny), (max(tmxx, bmxx), maxy), (0,0,0), -1) # 25

def anonymize_eyes_and_lips(image):
  anonymized_eyes_img = anonymize_eyes(image)
  return anonymized_eyes_img

def fully_anonymize(fname):
  '''
  fully anonymize face image and download it
  '''
  img = load_image(image_file)
  only_face_img = extract_face(img, 0)
  landmarks = face_recognition.face_landmarks(only_face_img)[0]
  anonymized_img = only_face_img
  anonymized_img = anonymize_lips(anonymized_img)
  anonymized_img = anonymize_feature(anonymized_img, 'left_eyebrow', 0, 0)
  anonymized_img = anonymize_feature(anonymized_img, 'right_eyebrow', 0, 0)
  anonymized_img = anonymize_feature(anonymized_img, 'left_eye', 0, 0)
  anonymized_img = anonymize_feature(anonymized_img, 'right_eye', 0, 0)
  new_filename = image_file.split(".")[0] + "_anonymized.jpg"
  cv2.imwrite(new_filename,cv2.cvtColor(anonymized_img, cv2.COLOR_BGR2RGB))
  files.download(new_filename)