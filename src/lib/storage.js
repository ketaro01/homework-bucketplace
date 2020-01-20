const storage = {};

storage.set = (key, object) => {
  localStorage[key] = JSON.stringify(object);
};

storage.get = (key) => {
  if (!localStorage[key]) {
    return undefined;
  }

  try {
    return JSON.parse(localStorage[key]);
  } catch (e) {
    return localStorage[key];
  }
};

storage.remove = (key) => {
  if (localStorage[key]) {
    localStorage.removeItem(key);
  }
};

export default storage;
