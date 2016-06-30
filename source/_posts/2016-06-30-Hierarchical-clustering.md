---
title: 分层聚类算法
date: 2016-06-30 22:07:31
categories: Algorithms
tags:
---

### 分层聚类
分层聚类，就是以一组原始数据中的数据项开始，计算它们的相关度，寻找最相关的两个聚在一起形成新的聚类。新生成的聚类中包含的数据等于两个旧聚类的数据平均值，再次计算数（包含聚类后）相关度，寻找最相关的，进行聚类。一直循环重复下去，直到是剩下一个聚类为止。例如： 
对于原始数据[A, B, C, D, E]进行分层聚类。  
1. 寻找最相关的两个，比如AB聚在一起。第一次聚类后[AB, C, D, E]，其中AB为A和B数据的平均值.
2. 再次互相计算相关度，发现C和D最接近，则[AB, CD, E],只剩下E.
3. 再次计算相关度E与AB最接近，则[ABE, CD]，最后剩下的就是合并将两个聚类合在一起[ABCDE]结束。  
核心算法的实现：
```py
/*
 *@discription:Hierarchical Clustering
 *@return clust[0]
 */
class bicluster:
	def __init__(self, vec, left=None, right=None, distance=0.0, id=None):
		self.left = left
		self.right = right
		self.vec = vec
		self.id = id
		self.distance = distance

	def hcluster(rows, ditance=person):
		distance = {}
		currentclustid = -1

		cluste = [biclutser(row[i], id=i) for i in range(len(rows))]
		while len(cluste) > 1:
			lowestpair = (0, 1)
			closest = distance(clust[0].vec, clust[1].vec)

			for i in range(len(clust)):
				for j in range(i+1, len(clust)):
					if(clust[i].id, clust[j].id) not ditances:
						distance[(clust[i].id, clust[j].id)] = distance(clust[i].vec, clust[j].vec)

					d = distance[(clust[i].id, clust[j].id)]
					if d < closest:
						closest = d
						lowestpair =(i, j)

			mergevec = [(clust[lowestpair[0]].vec[i] + clust[lowest[1]].vec[i]) / 2.0 for i in range(len(clust[0].vec))]

			newcluster = bicluster(mergevec, left=clust[lowestpair[0]], right=clust[lowestpair[1]], distacne=closest, id=currentclustid)

			currentclustid -= 1
			del clust[lowestpair[1]]
			del clust[lowestpair[0]]
			clust.append(newcluster)

		return clust[0]
```
