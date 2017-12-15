1. What are the order of insertions/removals for the following data structures?
   
   * Stack:  The acronym denoting removal order for stack is commonly known as LIFO, meaning "last in first out".  This means that the last value placed in the stack will be the first to be removed, and that the first value placed in the stack will be the last to be removed.  In JavaScript this can be done using '.push' and '.pop'.
   
   * Queue: The acronym denoting removal order for the queue is commonly known as FIFO, meaning "first in first out".  This means that the last value placed in the queue will be the last to be removed, will the first value will be removed first.  In JavaScript this can be done using '.push' and '.shift'. 

2. What is the retreival time complexity for the following data structures?
    
   * Linked List Time Complexity: Searching must go through each element starting with the head node, so complexity is linear O(n). However, typically insertion and deletion requires pointing to both the previous and new node, and is constant O(1).

   * Hash Table Time Complexity: Typically constant O(1).

   * Binary Search Tree: Logarithimic time O(log(n)). 

3. What are some advantages to using a Hash Tables over an array in JavaScript?
  
   * Generally Hash Tables are faster than arrays.  The reason for this is that in an array every value must be searched or iterated through in order to recall the value being searched.  In a hash table these elements are put through a hash function and each is given a value, and a bucket in order to prevent collision.  Using this method the value can easily be found without going through the entire table.  