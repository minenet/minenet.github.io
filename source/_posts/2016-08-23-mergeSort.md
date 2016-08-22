---
title: 归并排序&数组的逆序对
date: 2016-08-23 03:52:55
categories: Algorithms
tags:
---
## 归并排序
建立在归并操作上的一种有效的排序算法,该算法是采用分治法。以二路归并为例。
二路归并就是讲含有n个数据的序列看成是n个子记录，每个子记录为1，然后两两归并，最后得到两个已经排好序的子序列，然后做一次归并完成一个长度为n的序列。  
**分治**
1. 将n个序列以n/2为界，分为两个子序列。
2. 然后通过递归最后分治成只有一个的子序列。
3. 然后两两递归合并并排序，最后归并完成一个完整的有序序列。
```py
def mergeSort(arr):
    length = len(arr)
    if length <= 1 or arr == None:
        return arr
    num = length / 2
    left = mergeSort(arr[:num])
    right = mergeSort(arr[num:])
    #print left,right
    return merge(left, right)
```

**归并**  
归并的操作就是不断合并不断比较两个子序列中元素的大小合并为一个序列的过程。  
假如你手上有两手牌(牌的数量不一定相等)，都已经按照由小到大排好。现在就是从两手牌中选择最小的打出去。依次选择，如果其中一首牌全部打完了，另一首牌就全部直接依次打出。打出的牌就是按照由小到大的顺序排列。 
```py
def merge(left,right):
    i, j = 0, 0
    result = []
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i = i + 1
        else:
            result.append(right[j])
            j = j + 1
    result += left[i:]
    result += right[j:]
    #print result
    return result
```

**完整的实现：** 
```py
def mergeSort(arr):
    length = len(arr)
    if length <= 1 or arr == None:
        return arr
    num = length / 2
    left = mergeSort(arr[:num])
    right = mergeSort(arr[num:])
    #print left,right
    return merge(left, right)

def merge(left,right):
    i, j = 0, 0
    result = []
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i = i + 1
        else:
            result.append(right[j])
            j = j + 1
    result += left[i:]
    result += right[j:]
    #print result
    return result
```

**test**
```
/*eg:
    lists = [2, 9, 1, 3, 8, 4, 7, 6, 5,0]
    mergeSort(lists)     
*/
result:
    [2] [9]
    [2, 9]
    [3] [8]
    [3, 8]
    [1] [3, 8]
    [1, 3, 8]
    [2, 9] [1, 3, 8]
    [1, 2, 3, 8, 9]
    [4] [7]
    [4, 7]
    [5] [0]
    [0, 5]
    [6] [0, 5]
    [0, 5, 6]
    [4, 7] [0, 5, 6]
    [0, 4, 5, 6, 7]
    [1, 2, 3, 8, 9] [0, 4, 5, 6, 7]
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## 应用  
由于中间归并时，left[i] <= left[j]，相等时首选left，即不存在跳跃问题，算法稳定。归并排序需要，每一层比较的时间复杂度O(n),递归树层次是logn + 1，故总得时间复杂度为O(nlogn)。空间复杂度是O(n+logn)
### 数组的逆序对
数组的逆序对，就是在数组中，前面数比它后面的数大就构成逆序对。[4, 3, 2, 5]逆序对有[4, 3]、[4, 2]、[3, 2]，共3对。  
使用暴力算法，两个for循环嵌套可以解决，但是时间复杂度O(n^2)，太暴力了，不可取！！(鄙人曾经做过。。)    
首先我们看看两组子序列是内部中构成逆序列[4,3]和[2, 5]，只有1对。如果我们把子序列都排好序（由小到大）。[3, 4]和[2, 5]。我们只需要统计[3, 4]中的元素是否大于序列[2, 5]中元素，只要大于就构成逆序对！！！而且前者某一个元素i大于后序列某一元素j，则我们可以直接知道前者中元素i后面的元素都与元素j构成逆序对（有小到大的序列）。
这样子统计完，就知道整个数组的逆序对的个数了。  
**划分->归并排序->再划分->再归并排序。**  
核心思想其实就是归并排序。唯一的区别就是在判断大小时统计有多少个前者小于后者。
```py
def mergeSort(arr):
    length = len(arr)
    if length <= 1 or arr == None:
        return arr
    num  = length / 2
    left = mergeSort(arr[:num])
    right = mergeSort(arr[num:])
    
    return merge(left, right)
    
def merge(left, right):
    i, j = 0, 0
    result = []
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i = i + 1
        else:
            result.append(right[j])
            global count #全局变量
            count = count + len(left) - i
            j = j + 1
    result += left[i:]
    result += right[j:]
    
    return result     
            
count  = 0
lists = [2, 9, 1, 3, 8, 4, 7, 6, 5,0]
mergeSort(lists)
print count # 24
```

空间换时间，用O(n)的空间换成时间复杂度O(nlogn)。