// DATA STRUCTURE MAP (key, value)
// ANY DATA TYPE

const myMap = new Map();

myMap.set(7, "seven"); // add to map
myMap.set("7", "seven string");

myMap.get(7); // return the value of this key

myMap.has("seven"); // check if this value exists
myMap.delete(7); // delete key
myMap.clear(); // empty the map!

myMap.keys(); // get all key (object-like)
myMap.values(); // get all values.
myMap.size; // get the length

// Iterating with Maps

myMap.forEach((val, key) => {
  console.log(key + "==>" + val);
});

// OR

for (let [key, value] of myMap) {
  console.log(key, "=>", value);
}

// and we can iterate over .keys() or .values()

/* Why use MAPS?
finding size is easy
keys can be any data type
*/

// DATA STRUCTURE SET (array-like)
// ANY DATA TYPE, UNIQUE ENTRIES ONLY

const mySet = new Set(); // we can pass set([1,2,3])

mySet.add("nofilter").add("tgif"); // we can add more items in a single line
mySet.add("justsaying");
mySet.add("winning");
mySet.add("yolo");

mySet.has("tbt"); // returns boolean => false
mySet.delete("yolo"); // we can also .clear() the whole set
mySet.entries(); // return the ammount of entries

/* When use SETS?
Removing duplicate values,
Uniqueness required,
Efficiently checking if an item is in a collection ( faster than arrays )
*/
// we can use spread operators on Sets and Maps.
