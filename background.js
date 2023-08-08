function onDuplicated(tabInfo) {
browser.tabs.update(tabInfo.id, {active: true});
}

function onError(error) {
  console.log(`Error: ${error}`);
}

browser.commands.onCommand.addListener(function (command) {
  if (command === "open_tab_next") {
    browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
      let index = (tabs[0].index + 1);
      browser.tabs.create({index});
    });
  }

  if (command === "duplicate_tab")
  {
    browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
      let id = tabs[0].id;
      let index = (tabs[0].index + 1);
      let duplicating = browser.tabs.duplicate(id, {index});
      duplicating.then(onDuplicated, onError);
    });
  }
});


// let lastActiveIndex = 0;


// function onMoved(tab) {
//   browser.notifications.create({
//     "type": "basic",
//     "title": "Tab move",
//     "message": "Tab moved: " + tab
//   });
// }

// function onError(error) {
//   browser.notifications.create({
//     "type": "basic",
//     "title": "Tab error",
//     "message": "error: " + error
//   });
// }

// function SetTabPos(tab)
// {
//   let moving = browser.tabs.move(tab.id, { index: lastActiveIndex+1 });
//   moving.then(onMoved, onError);
//   browser.tabs.update(tab.id, {active: true});
// }

// function handleActivated(activeInfo) {
//   browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
//     lastActiveIndex = tabs[0].index;
//     // browser.notifications.create({
//     //   "type": "basic",
//     //   "title": "active query",
//     //   "message": "active query: " + lastActiveIndex
//     // });
//   });
// }

// browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
//   lastActiveIndex = tabs[0].index;
// });

// browser.tabs.onCreated.addListener(SetTabPos);
// browser.tabs.onActivated.addListener(handleActivated);