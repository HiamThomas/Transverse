import numpy as np
import matplotlib.pyplot as plt

def g(x):
    return np.sin(4*x)*np.exp(-x**2+3*x)

abs =np.linspace(0,5,600)
ord=g(abs)
plt.plot(abs,ord)
plt.show()
fichier = open("data.txt", "w")
for i in range(len(abs)):
    fichier.write(str(abs[i])+"\t"+str(abs[i])+"\n")
fichier.close()

fichier2 = open("data.txt", "r")
listesX = 