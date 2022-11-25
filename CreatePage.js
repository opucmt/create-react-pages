const data = require('./CreateData');
const fs = require('fs');

function createPage(data) {
  fs.writeFileSync('ImportPages.txt', '');
  fs.writeFileSync('RoutePath.txt', '');
  fs.writeFileSync('RouteGroup.txt', '');

  data.forEach(fileObj => {
    if (!fs.existsSync(fileObj.folder)) {    
      fs.mkdirSync(fileObj.folder);
    }

    fs.writeFileSync(`${fileObj.folder}/${fileObj.filename}.jsx`, createFileContent(fileObj));
    fs.appendFileSync('RoutePath.txt', createRoutePath(fileObj.parentPath, fileObj.path, fileObj.filename));

    fs.appendFileSync('ImportPages.txt', importPage(fileObj.folder, fileObj.filename));
    createRouteGroup(fileObj);
  })

  fs.appendFileSync('RouteGroup.txt', '</Route> \n');
}

let routeHasContainer = false;
let parent = '';

function createRouteGroup({ path, filename, parentPath }) {
  if(parentPath != parent && parent != '') {
    // end route container tag
    fs.appendFileSync('RouteGroup.txt', '</Route> \n');
    routeHasContainer = false;
    parent = parentPath;
  }

  if(!routeHasContainer) {
    // create route container
    fs.appendFileSync('RouteGroup.txt', `<Route path="/${parentPath}"> \n`);
    routeHasContainer = true;
    parent = parentPath;
  }

  let childrenRoute = `  <Route path="${path}" element={<${filename} />} /> \n`;
  fs.appendFileSync('RouteGroup.txt', childrenRoute);
}

function createFileContent(fileObj) {
    return `import React, { useEffect} from "react";

export default function ${fileObj.filename}() {
  useEffect(() => {
    document.title = '${fileObj.heading}';  
  }, []);

  return (
    <>
      <h1>${fileObj.heading}</h1>
    </>
  );
}`
}

function importPage(folder, filename) {
  return `import ${filename} from './Pages/${folder}/${filename}' \n`;
}

function createRoutePath(parentPath, path, element) {
  return `<Route path="/${parentPath}/${path}" element={<${element} />} /> \n`;
}

createPage(data);