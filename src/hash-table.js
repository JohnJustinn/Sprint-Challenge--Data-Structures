/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { LimitedArray, getIndexBelowMax, LinkedList } = require('./hash-table-helpers');

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  resize() {
    this.limit *= 2;
    const oldStorage = this.storage;
    this.storage = new LimitedArray(this.limit);
    oldStorage.each((bucket) => {
      if (!bucket) return;
      while (!(bucket.head === null)) {
        const remove = bucket.removeHead();
        this.insert(Object.entries(remove)[0][0], Object.entries(remove)[0][1]);
      }
    });
  }

  capacityIsFull() {
    let fullCells = 0;
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullCells++;
    });
    return fullCells / this.limit >= 0.75;
  }

  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    if (this.capacityIsFull()) this.resize();
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = this.storage.get(index) || new LinkedList();
    const newBucket = new LinkedList();
    newBucket.addToTail(key, value);
    while (!(bucket.head === null)) {
      const remove = bucket.removeHead();
      if (!(remove in key)) {
        newBucket.addToTail(Object.entries(remove)[0][0], Object.entries(remove))[0][1];
      }
    }
    this.storage.set(index, newBucket);
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = this.storage.get(index);
    if (!bucket) return this;
    const newBucket = new LinkedList(); 
    while (!(bucket.head === null)) {
      const remove = bucket.removeHead();
      if (!(key in remove)) {
        newBucket.addToTail(Object.entries(remove)[0][1], Object.entries(remove)[0][1]);
      }
    }
      this.storage.set(index, newBucket);
  }
  
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    if (!bucket) return undefined;
    const newBucket = new LinkedList();
    let retrieved;
    while (!(bucket.head === null)) {
      const remove = bucket.removeHead();
      if (key in remove) {
        retrieved = remove[key];
      }
      newBucket.addToTail(Object.entries(remove)[0][0], Object.entries(remove)[0][1]);
    }
    this.storage.set(index, newBucket);
    return retrieved;
  }
}



module.exports = HashTable;
