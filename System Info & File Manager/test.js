const os = require("os");
const fs = require("fs");
const path = require("path");

function getSysInfo() {
    return `OS: ${os.platform()}\nArchitecture: ${os.arch()}\nHome Directory: ${os.homedir()}`;
}

const folder = path.join(__dirname, "test-folder");
const file = path.join(folder, "info.txt");
const newfilename = path.join(folder, "system-info.txt");

fs.mkdir(folder, { recursive: true }, (err) => {
    if (err) throw err;
    
    fs.writeFile(file, getSysInfo(), (err) => {
        if (err) throw err;
        console.log(`File created: ${file}`);

        fs.readFile(file, "utf-8", (err, data) => {
            if (err) throw err;
            console.log("File Content:\n", data);

            fs.rename(file, newfilename, (err) => {
                if (err) throw err;
                console.log(`File renamed to: ${newfilename}`);

                setTimeout(() => {
                    fs.unlink(newfilename, (err) => {
                        if (err) throw err;
                        console.log(`File deleted: ${newfilename}`);
                    });
                }, 5000);
            });
        });
    });
});

setInterval(() => {
    console.log("Monitoring system...");
}, 10000);
