import json;
import requests;
import os.path as path;

class Tracker:
    def __init__(self):
        self.already = 0
        self.successes = 0
        self.fail = 0

    def load_file(self,name):
        if path.exists("sounds/"+name+".mp3"):
            self.already += 1;
            return 
        resp = requests.get("https://www.ipachart.com/mp3/"+name+".mp3");
        if not resp.ok :
            print("Not OK")
            self.fail += 1
            return 
        if len(resp.content) == 0:
            print("Empty")
            self.fail += 1
            return 
        
        f = open("sounds/"+name+".mp3","wb")
        f.write(resp.content);
        f.close()
        print("Success : "+name)



listfile = open("soundlist.json")
listj = json.load(listfile)

t = Tracker()

for s in listj:
    t.load_file(s.get("sound"))

