import os
import openai
from dotenv import load_dotenv
from pytube import YouTube
from flask import Flask, render_template, request, redirect, url_for
from whisper import convert_link_to_audio

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

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
    

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
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

if __name__ == '__main__':
    app.run(debug=True)
