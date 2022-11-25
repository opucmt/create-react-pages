class createPageData {
    constructor(folder, path) {
        this.folder = this.formatFolder(folder);
        this.path = path;
        this.filename = this.getFilename(path);
        this.heading = this.createHeading(path);
        this.parentPath = folder;
    }

    formatFolder(folder) {
        return folder[0].toUpperCase() + folder.slice(1);
    }

    createHeading(path) {
        return path.split('-').map(word => {
            return word[0].toUpperCase() + word.slice(1);
        }).join(' ');
    }

    getFilename(path) {
        return path.split('-').map(word => {
            return word[0].toUpperCase() + word.slice(1);
        }).join('');
    }
}

let projectData = [];

function createProjectData(folder, path) {
    projectData.push(new createPageData(folder, path));
}



// createProjectData(folder, path)







module.exports = projectData;