---
title: insertSort and shellSort
date: 2016-08-21 01:34:02
categories: Algorithms
tags: 
---
## 直接插入排序
**思想**  
对于一个数据插入到一个已经排好序的数据中，得到一个新的数据序列。就如同打牌时接牌，右手摸起来的牌插入到左手中，按照由小到大的顺序排列。   
**算法实现**  
```python
def insertSort(arr):
    length = len(arr)
    for i in range(1, length):
        key  = arr[i]
        j = j -1
        while j >= 0 and arr[j] > key:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = key    
        return arr
```
**应用**  
适用于数据量少的排序，时间复杂度为 O(n^2), 稳定。 
## 希尔排序
希尔排序是基于插入排序的改进，虽然插入排序的线性排序的效率高，但由于每次插入排序只能移动一位，所以效率任然是低效的。  
**思想**  
设置一定的步长，以一定的步长对数据进行直接插入排序，直至步长为1，进行直接插入排序。  
**算法实现**  
```python
def shellSort(arr):
    length = len(arr)
    gap = length / 2
    while gap > 0:
        for i in range(gap, length):
            key = arr[i]
            j = i
            while j >= gap and arr[j-gap] > key:
                arr[j] = arr[j- gap]
                j = j - gap
            arr[j] = key
        gap = gap / 2
    return arr
```

```python
lists = [1, 7, 3, 5, 4, 3,6,2]
第一次步长是：4
1, 7, 3, 5
4, 3, 6, 2
对上面每一列排序得：
1, 3, 3, 2
4, 7, 6, 5
lists = [1, 3, 3, 2, 4, 7, 6, 5]
第二次步长是：2
1, 3
3, 2
4, 7
6, 5
对上面每一列排序得：
1, 2
3, 3
4, 5
6, 7
lists = [1, 2, 3, 3, 4, 5, 6, 7]
第三次步长是：1
lists = [1, 2, 3, 3, 4, 5, 6, 7]
```

**应用**  
时间复杂度O(nlog^2 n)，不稳定。