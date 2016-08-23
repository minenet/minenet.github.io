---
title: 快速排序&寻找第k大的数
date: 2016-08-24 01:49:31
categories: Algorithms
tags:
---
## 快速排序
快速排序的基本思想：通过一趟排序将待排序记录分割成独立的两部分，其中一部分记录的元素均比另一部分记录的元素要小，则可分别对这两部分记录继续进行排序，直到整个序列有序为止。  
1. 首先选取基准元素（首元素，中间元素，最后元素，随机元素等等）。
2. 以基准元素为基准，将小于基准元素的元素放在前面，大于基准元素的放在后面。
3. 然后以基准元素为界限，分为两组数据。
4. 两组元素重复2和3步骤，直至比较排序完成。
```py
def quickSort(arr, left, right):
    if left >= right:
        return arr
    key = arr[left]
    low = left
    high = right
    while low < high:
        while low < high and arr[high] >= key:
            high -= 1
        arr[low], arr[high] = arr[high], arr[low]
        # print arr,low, high
        while low < high and arr[low] <= key:
            low += 1
        arr[low], arr[high] = arr[high], arr[low]
        # print arr,low, high
    quickSort(arr, left, low-1)
    quickSort(arr, low+1, right)
    return arr
```

**test**  
```py
/*
lists = [2, 9, 1, 3, 8, 4, 7, 6, 5, 0]
print quickSort(lists,0,9)
*/

[0, 9, 1, 3, 8, 4, 7, 6, 5, 2] 0 9
[0, 2, 1, 3, 8, 4, 7, 6, 5, 9] 1 9
[0, 1, 2, 3, 8, 4, 7, 6, 5, 9] 1 2
[0, 1, 2, 3, 8, 4, 7, 6, 5, 9] 2 2
[0, 1, 2, 3, 8, 4, 7, 6, 5, 9] 0 0
[0, 1, 2, 3, 8, 4, 7, 6, 5, 9] 0 0
[0, 1, 2, 3, 8, 4, 7, 6, 5, 9] 3 3
[0, 1, 2, 3, 8, 4, 7, 6, 5, 9] 3 3
[0, 1, 2, 3, 5, 4, 7, 6, 8, 9] 4 8
[0, 1, 2, 3, 5, 4, 7, 6, 8, 9] 8 8
[0, 1, 2, 3, 4, 5, 7, 6, 8, 9] 4 5
[0, 1, 2, 3, 4, 5, 7, 6, 8, 9] 5 5
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9] 6 7
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9] 7 7
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```
**应用**  
快排的最坏运行时间为O(n^2)，平均运行时间为O(nlogn)。由于跳跃式交换比较，故不稳定！  
**寻找第k大的数 or 寻找最小的k个数**  
快速排序中我们确定基准值后，将数组分为两部分，基准元素前面一定小于基准元素。后面的大学基准元素。如果基准元素前面的元素个数大于k个，则在k大的书一定在基准元素的前面，且后面的排序没有必要。否则就在后面，前面的排序没必要。直到找个基准元素的位置刚好是k-1。  
```py
def findTheKNum(arr,length,k):
    if arr == None or length < k or k <= 0 or length <= 0:
        return 0
    index = partition(arr, 0, length-1)
    while k-1 is not index:
        if k-1 < index:
            index = partition(arr, 0, index-1)
        else:
            index = partition(arr, index+1, length-1)
    return arr[k-1] #寻找最小的k个数则返回arr[:k]
def partition(arr, low, high):
    key = arr[low]
    while low < high:
        while low < high and arr[high] >= key:
            high -= 1
        arr[low], arr[high] = arr[high], arr[low]
        while low < high and arr[low] <= key:
            low += 1
        arr[low], arr[high] = arr[high], arr[low]
    return low
```