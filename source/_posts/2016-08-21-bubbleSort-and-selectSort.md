---
title: 冒泡&选择排序
date: 2016-08-21 01:41:14
categories: Algorithms
tags:
---
## 冒泡法排序
**思想**  
一次比较两个相邻的数据。将待排序的元素看做气泡，较小的元素比较轻，就会上浮。每次操作就是比较两个相邻元素的位置是否正确，不正确时，轻的元素（较小的）应该上浮，即交换它们的位置。第一比较，最轻的元素一定浮在最上面了。第二次比较得出的第二轻的元素，第i遍比较时，由于前面的i-1遍比较已经得出了排序，就不必要比较i上面的元素。   
**算法实现**  
```python
def bubbleSort(arr):
    length = len(arr)
    for i in range(length):
        for j in  range(length-1, i, -1):
            if arr[j-1] > arr[j]:
                temp = arr[j-1]
                arr[j-1] = arr[j]
                arr[j] = temp
        # print arr
    return arr
```

上面是传统的冒泡法，当我们比较[2, 1, ,3, 4, 5, 6, 7, 8, 9],按照上面的算法，我们需要比较9遍。其实我们只需要进行一遍就好，第一遍就交换了2和1，其实后面就不用比较了。因此设置标识，优化算法，可以避免已经有序无意义的排序。
```python
def bubbleSort(arr):
    length = len(arr)
    flag = True
    for i in range(length):
        flag = False
        for j in  range(length-1, i, -1):
            if arr[j-1] > arr[j]:
                temp = arr[j-1]
                arr[j-1] = arr[j]
                arr[j] = temp
                flag = True
        if flag is False: #发现某一遍比较，没有一次交换就说明有序，退出循环。
            break
	#print arr
    return arr
``` 

**应用**  
时间复杂度为O（n^2），稳定。
## 简单选择排序
**思想**  
每次从未排序得元素中找出最小的，将其添加到已经排好序的元素中。第一趟从n个元素中选择最小的与第一个元素交换，第二趟从n-1个元素中选择最小的与第二个元素交换。  
**算法实现**  
```python
def selectSort(arr):
    length = len(arr)
    for i in range(length):
        min = i
        for j in range(i, length):
            if arr[i] > arr[j]:
                min = j
        if min is not i:
            arr[min], arr[i] = arr[i], arr[min]
        #print arr
    return arr
```

**应用**  
时间复杂度为O(n^2),算法不稳定。lists = [9, 7, 3, 9, 1]时，第一次9和1交换，两个9的相对前后序列就被打乱了。