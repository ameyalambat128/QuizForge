import os
import openai
from dotenv import load_dotenv
from pytube import YouTube
from flask import Flask, render_template, request, redirect, url_for
from whisper import convert_link_to_audio
import PyPDF2

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

def convert_link_to_audio(url):
    yt = YouTube(url)
    video = yt.streams.filter(only_audio=True).first()
    video.download()

    og_file = video.default_filename
    newfile = og_file.replace('.mp4', '.mp3')

    try:
        os.rename(og_file, newfile)
    except FileExistsError:
        print(f"{newfile} already exists. Using the existing file.")

    audio_file = open(newfile, "rb")
    transcript = openai.Audio.transcribe("whisper-1", audio_file)
    print(transcript)
    
    #os.remove(newfile)

# Open the PDF file in read-binary mode
def pdf_to_text():
    with open('example.pdf', 'rb') as pdf_file:
        
        # Create a PDF object to read the file
        pdf_reader = PyPDF2.PdfFileReader(pdf_file)
        
        # Initialize an empty string to store the text
        text = ""
        
        # Loop through each page in the PDF file
        for page in range(pdf_reader.getNumPages()):
            
            # Extract the text from the page and append it to the text string
            text += pdf_reader.getPage(page).extractText()
            
    # Print the extracted text
    print(text)


@app.route('/yt', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        input_text = request.form['input_text']
        store_input(input_text)
        output = convert_link_to_audio(input_text.strip())
        print(output)
        return redirect(url_for('index'))
    
    return render_template('index.html')

def store_input(input_text):
    print(f"Stored input: {input_text}")

@app.route('/')
def main():
    return {'message': 'Welcome to Quiz Forge API'}

if __name__ == '__main__':
    app.run(debug=True)
