/*
 * @Author: MonsterDOG
 * @Date: 2021-02-26 09:44:01
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-19 14:21:32
 * @FilePath: /vue-cli4-demo/mock/base.js
 * @Description: 【描述】
 */
const Mock = require('mockjs');

const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAIAAACxN37FAAAbxklEQVR42u3dCZAc1XkAYGlPSRYg\r\nDEYC20Uc2ykcyqYcQwi2qfIRJ45NErtsV9kpm7JJYqPVhbjMIS4FY7Bjy7hMEoy2u3d1IIQkQAIh\r\nJBkdSOzM7Gp3hYSk1R5zdE/PsXN0zz3d/d5L9+uelYx17Gr6zYzk/7GlEruj2dnur9/+///+fjON\r\nwIBxAY1pcAhgAGgYMAA0DBgAGgYMAA0DQMOAAaBhwADQMGAAaBgwADQMAA0DBoCGAQNAw4BRZ9DT\r\nGIzJfK+qfrwpvoZqHj+Z55nqz8viedw6Vo3gBEADaAANoAE0gAbQAPp8Au0WMhYHyC00tbyo6nUB\r\nsMBdLycAGkADaAANoAE0gAbQ5xNoFomUW4lOLS+qqcKq5niyPhfVHLd6vTYADaABNIAG0AAaQAPo\r\nP3fQ9T0o7iajLC5OFq/BrdcMoAE0gAbQABpAA2gADaAbNymsFz4WCyisEzgWCSgkhQAaQANoAA2g\r\nATSABtDun+B6JRmEwWDRlMN6AYVFo1IjOAHQABpAA2gADaABNIA+X0HXMumBz5+/n2fhBEDD5wE0\r\ngIbPA2gADZ8/n0CzHrVsbGqEhQAWyS6L18w64XZZEYAG0AAaQANoAA2gAXRDgW6EIj+L78saEOsG\r\noHqdl0bzAKABNIAG0AAaQANoAN2IoKtJGhoh8arlYJEo12sRpBEWawA0gAbQABpAA2gADaAvBNBu\r\nJV61BMGicYrFSWKRNLOepBrnvANoAA2gATSABtAAGkCff3Xoqb7QRkh6WIBjfSG5leSxOKcsLAFo\r\nAA2gATSABtAAGkCfr6BZY2Wx6MDiYqvmNdRy0Yr1a2adWANoAA2gATSABtAAGkBfCKDdOlis0bBY\r\nFGB9wdfrNddrEYRdcgmgATSABtAAGkADaADduKDdWixgnYi4lcTUMkFkkVCySNRYNzABaAANoAE0\r\ngAbQABpAXwiga/niatlIxOIEuzXqtchSywUmdxNcAA2gATSABtAAGkAD6MYFzfoHY31Sa5+ssFvA\r\nYp181/Ic1S0pBNAAGkADaAANoAE0gK7BwkotEzgWTUKN0JBUy+SslglubeACaAANoAE0gAbQABpA\r\nn9+gG2HRoZav362ft5oT79brYX1+a48bQANoAA2gATSAPl9Ak/NqAGh3FlZYI2Mx89U+QWko90xn\r\ndLcWd6p3BaDJBa8ZQAPocx248kGQ9YGx+YHtTzmfN/8w6Af9EsYIER2TQ3njW1vDlwhikxBt4uUW\r\nITqdH28SIjN46foXR9ZJ+ZLzNCeeB0ADaNagTW46crDahrFBkEZwAZO0gWM6kjVD0gxZR+MGUhDJ\r\nYVIm5HBW//zGUCsfn8HJn3h+7N93jT/cpy7an7r5Jf8lfKCZl+d2+7tH1bJ1CVgXCoYZ2nXQtawM\r\n1OyEVQ/anJN1c2Y2Z2CETcHvZMqvRzV+NP/0u8qTh9IP943f3xO9f39smTfxxEByxSH1/44qa6XS\r\nN7aF2jul2V2hBXujhwsoS7BGSIEQGZHfHVOvXhsyp+pr14z1KuXKhI4nMwWwyCVY5CQNkRQC6FMO\r\nk7I56R5Wiy+MZZ98J3O3J7HEk17ozS70ZhZ6VPNjsTe32Jtf0pNf2JPp8CXne7Pf2JWZKUSa+fBt\r\ne8KyYVLGyApEnPgiT8hzY+olQqCtM7KkJ1G0voAmSQ1AA+gzBsdn+qwZWhAVE0+y+JvD43f2pjpM\r\nxJ7MHV7l3t7k8oHUM0PZVaPpl0PKG5Hs9mhui5h53p9eOaz8/FD+ulcS0/noh/jR/rwZnBBkXhPI\r\njpQNQv+WxuTrW2PmJH39i4FA2Zz6CYAG0Of+jbA1JZqBsTVf0lTPjmLpHGrGFzSvK2B0QNFWHFKW\r\neJUFXmWRV3mwT+08mt0XK4hF86vEjBVMrDpFan5o1gfSMTax3vRquImPfnVLNEMqz00mInDzP13D\r\n+JcHE22CeOXK42+pGoIZ+nxJClkU/Kt/fuxUK0yOmLqucLOGYdKUdfyCX7mrL7XQk1voSf9sMPWq\r\nXBgr6EXzy2bISx93ygTSlJ1F5KaXI82C9O2dFmj6wIlyhkEzQGSC/v1Iul0Q56wc2Zagr+Jc0kJ3\r\njptbyWI1rwdAV/v8tmlkk6bKqDpUJmgoZ/x6UL29V+nwpR7qTW4W85JuEkQTkzeuTKjvZW2BRirG\r\nX35Fbuai5p8KsX8NGPa/dSZoYpQxeWIg1s4F5vEjPRkdYQ0DaABd3fMjCxtCTrRhzZ16kWBfsvyw\r\nN27Gyot6U9yxpFgy7KDCfhQ+beRN6GVhzd0lgu59W27nIh/oHHtbteJjq0BCDMOZ1y3f4wh/cYvc\r\nxMs3bQiErYgDMVpwAdB/ZqDt5RDLmFHAeM946YFetcOb/2lv4vVwTrHjErtQ7LjHtCZtnOoJzThC\r\nN7+WxPjhw9lWLtLKy996Q/Lr2EBmbE3oFK2ZT5nB5L+PKLN5qY0L392fLFovwIAZ2h3QLA5K7ZOG\r\nM7yes9WYqTMz0sBkX7L8oM8MmjMP9qV7EqW8FVs4mK2CBzYq5OiVcIr4GRcIfjtd/t6bkfd3B6YL\r\n40289D5O/PYO0adoeUxMuEWCAmX80EDiylXBFi56+SrpqWP5vIVZs7/PlKabapI/tya42jSiAejJ\r\ngjZpmtMqwsbhjPZAb3yhN/tA/3h/RtOdkgSqTMZWaHKaxM16aJmQoQJa6hv/YPdYOx9q50IfXS1d\r\ntynWyomtQvgD3WP/uDMyf3/4+3siH18TmslLzbx0VVfgn3cpC3zKi4FMCZ9UCAHQAHrqoDGtDFt1\r\nDvMPuYx+Ppju8Kr3+RLedEnHdqhBnIocjUjsIJk4JYuJQgkyLwhRQ88cVT71gtjGRVv44Lzu4fk9\r\n8YOqfryM/nO/PK/L30rbOcwgxPxqKx++hAt9+ZXQpmjhN4eyCzzq0t7k/kTRcK4fjZyUaAJoAD1Z\r\n0LQjw/rPDC3WjCiLvOk7fMrrcr5olfF0w+nccAoT6KQOJev/rNqdrhMjSciGcOErW6T3CcFmPnIJ\r\nH7xlq/RqpJClDUrmlG5G4a/JhR/3JNq6xCYufvV6+Xu7wyvHcqEyKhE8WtAfH0zd7s0s70+OFawl\r\nmPcE0wDatYUV1vjqdSGdNEMbtAJH3k4V7u5NdHiz/FAmQysRBBlGZTHa7q+zK3pkor+OLru8pWrf\r\nfzNyuRBo4WLtvHjjC35uVI0ZlCSyaibWvE4LGEMFcvnqsXZOvm8gm7VqIci6IAg2H+EZL9ztUxd4\r\nc8KQknUa9lANjo9bzUks/i2APpfXRiMJnDTwU4fT873qIwdSZuBBa8yYztxkomHUoOEJsWQa5ldK\r\nhBwtGPf0pT7M+9s7I+bHNWuCyw8k/Zrdk2HO3HQKt2JuWrU2w+siuazb3yaEHu3PIHvid0qAqEjI\r\nmpHsIo9yjzd+IFm0YneEATSAnvrCCq3W7Y4WF3vURV51ezSvWwSNSoCBJ9ZBMA2XkbVoYkR1vOJo\r\n+tMbgmbm18KFzfh4/l7Zl9ELTsHEWW2c6JK2iyTmDD2PF2dw4kODqjERv2BnZdKqe/SP3+5L/faI\r\nmj/biiGABtCnjaJVTH45mFzoyZoZ4biB7Hm4gtGoRBhW2mdKzxDySjT/95vl2bzY1CXOEoJfe1Xc\r\nFimmnTyOLl5bAQpdfTxRsUDmZXCkSOZ2hdp56ZGBjD37O4+ncY85s78sFhZ6lSVedTBdRgRAM04K\r\na58EsFm4OTFz0uoG8SQKi3rTSz3qbrlUJhXP1oMM2tRvh9FmuIw9Ke3fdkYu7hptFsIXc8EbXgx2\r\njagppzMJOxUPGm87kcbJN7cQHMiTeYLYIogPHVSdCR/b3Ru6tbaIULhkLD+gLPBknj2WKZ3UqDSt\r\n6uHWhFLfcw2gTzkjG+YsrFurGzhskIMF8osjuVu9pWWDWUmjqyb20rTF2qDhr1WIOFZAy/piV3cH\r\nW7loKy9+bO3YY/3JsSLSJ9dMZF9CIwUyVxBbBemRQeWUEbL5bGtHswt86Qf70mLBANAA+uzPb8YC\r\nRUT2JrWl+6TPbRj++LrQ5d3SvNXSl14TN8aKaZuz3XtEV7fjiDxzVPmbDYE2Tm7hpcv5sdv2xHxq\r\nOU/jhEnHNdbHcIFcQUE/OqCg06zCD6RKd/Yqi33JPbECgAbQZ3/+FMKP9I1/sHukmQ+bkUOzFQNE\r\nm8y/8PI8bmzBW1FrnrYiAZQxyOZI8Sub/bMEqYmPXMyHvrrV/1q8lKXzNq3LEbdA48oqTdogjw0q\r\nt/em+WEFQLsDmnVjilsXz7ktrNzbk5jFB5sF+apV0ne3i8sOJB87kP7+m/JH1gTbOsNtXaFbd0p+\r\nHe1Ll27dFZnHjbZw8ixO/OwG/++H1Kh9x4lT+EDE7RmaWDcH4OeGc/O9mV8eVFxMylmjBNB1A/3+\r\nLqmZj3xuY2hHrJQguEise7PNSGN/uvy1bXJLV2gW7//yG4mPrgm1dI01d4euXi0tH0iMFK3CM7IR\r\nT6R/mLgOWidoWyS3yJN94O1xAA2gzw66iY9e84Lfq2pl64YRwy4tm/GwRozhIv67lyQzUG7h5VYu\r\ndoUQuG233Kfohcr6N6b3axFUufWEuA/azEoHU6U7fOqdPQkADaDPDrqVD/7ioFImTshAmer2Up6B\r\nyNqgOkMIThfCN26OvREt5rFd99ArayBOiZr61Cd/u9TkQZvPPprVlnqTi31pAO3+wgqLz7vV+HJu\r\nB2XOyuHdql00sxua7WKxBdeMKPxldOWaYDMvLetPGU5UgSZa6/5EqfsztPk4WSP3epOLfJNNClkc\r\nK9bnHUC7dlCu+P2R/lKlS9+OIui9J7rVW2dENPyx5yPThehdnrQJ3KArfJNP/lyZoZOY3NebXODL\r\nAGgAffbxPm709aRhOPOus0cG7Qa17sE+UkBXrBZbeemJwRS2ll/sqoZh1Aq0+TgF45/2Jjp8eQAN\r\noM8+WnnxTs94zg6IaWOc3eFvzsUljJ8+orRz4uxOf7dYonvC6FYggolR3a1+UwGN4xq+x5dcCKDP\r\nl6TQrWaac7tCWrnwX3T7X4+WSxbUstWzTJM+jaADqnbtOnm6EGrhg1/bEd2fLOdotyip+s7VKYQc\r\nBI/kjKWe5GKvyuh4utW05NZEBqCrAn3VKrGVkz6yNvDs8UxQw+bvd4VgWUfrxMKn1ovNfLhNCLVy\r\nYrMQmtcdXNoTP5K39+KoEWi6+l2+w6ve2RMH0AD67Eft6WPqXGGshRNn8qFPr5dve1P80W7ppk2h\r\nS3i/qfliwf/jnsRPehIfWj3SxoXbO6W/Wic+fVQJlFH5j3byIuSPN789887OZwN94l+bwfp2ObfI\r\nq97nAdAAehJHLUuwMJa5Yf3YrE6pmYu0dcaau+QmQZ7ZKV/z/NivjyZTiGQw2REvfvP18By6hfMs\r\nPvylV0OrgtkUsfcPpY0c9gdBJ+4AOP3+zqcEPbFbzUkrj9hMTFcOZzp8qZ8PZAC0O0khi4Ykty6A\r\n6i82E06JkJEi+t/j2X/ZJt680f+5DSO3bAn94nD2YN7MC2kvs5UpGgkDC4HCZ9cPzeCs1qVLhcB3\r\nd8p7FC1jJ5TObYZ0pw6nmG1MeYaulLgr1wFWDPKzgfRiX6pzKFflkWeBr17NZwD6tI+hWxdZ06yO\r\nrZnY/L2eJNZ9KDot4CFrK1HdarbHOiLWDndBnTw+kPz4C/52XjZjkqtWjdztjb2b17XKbQBoYtUQ\r\nk9NVrE8H+uSuEHuOP6iU7u7N3uFJvRkpAmgAPYlfl/TOVGexhFaaKSrkfM6JKKwdcu3owqSax+SA\r\nqi/ZF7mya6yFD83kQp9eF/rtkXRYp/dsE/sfTdxDiCcfctC53ajcIKOb1886f6bDm32wT/UXdAAN\r\noCcD2knnUOUuKXtu1Jxtoa1pe+07oWjZ0JDT5IHobVhZTN6MlW7ZKs8SwtMF+SJe/OIr0stiLmPf\r\neEjvBtdP07V0BtC0H8m+MVyXysZj/ckOj/rs0Uy+6iMPoF0uwrNIGqo/uOikt7KytwO1NxuYWDiM\r\nIfLDlw/uz5V/eyi+7nDE2r2caNaNWzRYVkzuAfXGjaHZnNTSGb2YC35np/xWopihs/0UQw5nz2j7\r\nfq8SRpulwhJP6i7rJtmiUfWujSwWYmqZaALoSZ2YSkECn4DmxAl26EzeUko3rB/+6o7YN18+NlzU\r\ndRogO/uA0Z1jzGhkrIT+62Dir9f5Z3CSGVh/aJX/bm/8XTOndOb/k8vKle+DLdBzu0KtfPiRQRU5\r\nNboTIVBYw8t7lYWezIrDuZy16IMANICe8q+/k3besAKGjIG//lqwRQi38LF/2jwctyZww9kziWBn\r\n3ZBu0G+GBH1ZrWNfbB4/2sxLrZx03XpxxbuqjOweUzssdq4bqzUVkaEintflb+PlZQOqQRlXCn6o\r\nQMh6f2aRR73Tk/QlSgYxMAbQAHrKoO2NDDDdftSq1o3r6Lr1wWYu0iREblx/LEy3SzImChLUqhWD\r\n2HdgIZJDZEdSu2W7OEcINXPxizrFmzeGNoWLaUQLe9j5Jsi6gQD3FfBlgmTO0N/em92e0EIaKtMY\r\nvUzwgaR2jzc935deeSylWhG1ZsAMXcuFFXYNKNVfDKd8zOlAo8rKCC3aaSVMfnUodak5QwvRZf2p\r\nPH0ToPdEJ3SDfuJs42UFISiCCD+auWmjfyZv3U57OT/6g93hvYlygTibdMR0/Mxw5vNbxFZ+fLoQ\r\nndkZvuy549e/KD3Ulz5eMMaKxhMDyQ5v/pEDqeG8QZuldGPSjFifi/o2kwHoqb2TLC22Gc6GMAYy\r\n/+stoL98UWruii32KWtD6U1SWi4Tq+kOa6jyJkGGfSXQfaPtrRWLhIwW9Z8dTH50bdAMKlp48erV\r\nwXv6kscK+vEy+c52a0vSZk5u4+IzeXEW72/nws1CpH2leONLsbsOWPs2LfXm9sRKemXXMQygAfQ5\r\ngJ6YqWnPHXktkPj6K8FrN8ktQmQ2H5vDiZcKgc+s9z8/linYt2ohZ22G3s9KnDtanDjcyBM0kDV+\r\nsjt+hRBsFgJtgvTJF4I3vBwzI+x2Trp2Q3D5O/G9Sc2T1p8dUr64VZotBKbz8gfWBL+7L7N6NJt3\r\nrq73lrMBNICePGhnsy5s7S6H98kpX7r05GD85q3xS4RIMxedLsSmC/KHu47+IVYy7BVvZ0cOjE/e\r\nMRo7sM153nS5PVb8xjZxDu9v4czYWm7nI9/7Q+x4CRXojV7mg8zoOY7w4wdTF3WHWjj5C5sjQa3y\r\nJrMTi+IA2hXQrJOA2jSyTHrY64T2225aVMMl/UmvuD5lfGLt8Izu4DQTNJ+czQX/55iCrM3BzAeW\r\n7ClZd64H40QBmpYs6Bu/oXGDrDievXRNZBofu2lD6HiRvv9VpRJuX0JpRG7dG2nhInOFsR3JMnbu\r\ncSSnvK2c9aIViwnFXegA+lyG1b2E8ap3IiuOJv5hW/hvX5KvWzv8g+2hd3MafesJ6/0iDDLx5oT4\r\nTz6QXQwxH7MrVrqYCzQL0op3Fa2yJEg3fzTsWMUMzfep2qW82MZJTx1W8BmbUAE0gD7HOdtM/rKE\r\nRIrln24bOl5GcWy1c+j2Xne0EH1iXbHSXuRgndgZga5ArhvNzeCCF3f6dyl2VcRZGp9oObW3mv7M\r\nS7EmQf7Rrkj+jE3VABpAn2MMguk9tGWE4xrSiL2hv2HFG4h+nu55jiaKEc5+pfikt4i1+0rRqtFs\r\nmxCY0zmyN2OX+FDlUROJJI4b5IbN0aau8A93AujaJoVuFd4bIdE8m2l7BjYqmxzYc7D1tpnvZrSn\r\nD6vPj+Z9iYKk4by1kxjd3JE+WqPrNLr15pskT/CGcGmm4G8XAt3BnObcAmCH685qjvm0R4po7pqx\r\nFkFc1pc83TvGsVscYVEYANANBxo7dbMJYJU3kkXktUBqgS+90KPe4VXv8o4/dVjtHMttDOZ2hPN7\r\nIrndkewuWd0sqWv8ytPDuY4e5bLuSBMf+dfXgzFrei7ZdWv7LS/s9xx6eCDRzocv4gIb5PLpGpIA\r\nNICucoKu3FtFix90rxl7PwMsFo3ukdzy/tQ9nuQib2a+N9PhVRd6VfPvS7y5xb7cHd5sh8/qaV7g\r\nySzqyX12U7yVi8wWgo/2J8eRvYruxNpZbE7h+StXhZq58S9sCYZ0Zz8FAA2gXS7jGZX386ZpoH07\r\nCrILFHbrRURD/Up5a7j03FHl14OJxw/EH+qN3+8Zv78nscyTerRPeapf+d3h9NpQ7sWYdv1Gf5Mg\r\nzuHF//hDZGe8PKyTMUT2q8ayA+NXrwm08KEPdgU3SXndKXIDaDdAs2hOYpE01CGePkP5mpASxlmE\r\nEzoSNWtfPH/J+ktcR4qBysiqV+tE358ofep5fzsntnLhy7pC16w+/sm1Q1d1+9t4qYWLXNk99Lsh\r\nJWfNzhrC2MVzxBo6w5swAHQdYU/0ihKnsRk5a4j0zTbp7njknRya/6b0kdWhNj5s9aZycis3PrdL\r\numVL8I14kdYE6RtlYQNAA+j6e55IJZ3NpnHlfbGsRlNM3+ANpzD2Kfqzx9QlbwU6do3+6lB6R7ws\r\nG8S+v4vY242hM+07DaAB9AU1AHSdN2tkXbT/c74A3MLk1jliMVEC6Mk+BkAD6AsKdJW+G6EECaAB\r\nNIAG0GySmGlVDLee363X49bPwmJRo14NZOd9lQNAA2gADaABNIAG0AC6jgV81slELRMjFsewXgkc\r\n68SU3aQJoAE0gAbQABpAA2gA3VigWfdCNEKSxPpiYHEBs0DcCMluwzUnAWgADaABNIAG0AAaQFcJ\r\nuvYF8+oXAtw6cCzwudUg5dbxYZHw1SbhBtAAGkADaAANoAE0gD4/QLMrkld/wtw6qawvYNZJVSMn\r\nju76AdAAGkADaAANoAE0gG4s0KwXEWqZSLF4nbVMXlkf51pOBO4miAAaQANoAA2gATSABtCNBdqt\r\nhKyWixSsFyPqdRzcQtAIiSNxdQBoAA2gATSABtAAGkBfOKBZ/zAsGm5YgHDrYmaNvjb4WFyoABpA\r\nA2gADaABNIAG0I0FmvUPzKLxqJZNP/VaYGqEhQ/WzwOgATSABtAAGkADaAB9IYCuZaJTy6Snls/J\r\n4gJmsfDE+mes28IKgAbQABpAA2gADaABdIOArtfiCOtFjWpgTfU1sEiY3LowGn+xBkADaAANoAE0\r\ngAbQALqxQE9jMOp1sqsBzeI1s148Yo3brQujIbrtADSABtAAGkADaAANoBmBZpH81bLgz/r7sj4O\r\nbiVwLOC6lZgCaAANoAE0gAbQABpAX8igWR9EFieYxUVYr8Ydt5LCWjZjMVyeA9AAGkADaAANoAE0\r\ngAbQjC6G2hxcd5PIRkisa5/kAWgADaABNIAG0AAaQANoVgkc6yaeal4n68YptxYyWJwLFscHQANo\r\nAA2gATSABtAA+kIA7VZCU68Cfi0TRBaNPvUC3WjNTwAaQANoAA2gATSABtCNDppFI069UNayWaeR\r\nJ4h6Ldw0xMIKgAbQABpAA2gADaABNCPQMGA0/gDQMAA0DBgAGgYMAA0DBoCGAaBhwADQMGAAaBgw\r\nADQMGAAaBoCGAQNAw4ABoGHAYDL+H06sYYLDfIJDAAAAAElFTkSuQmCC\r\n';

module.exports = [
  {
    url: '/api/file/v1/getPolicy',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          data: {
            accessid: '',
            policy: 'success',
            signature: '',
            dir: '',
            host: '',
            expire: '',
            callback: ''
          }
        }
      };
    }
  },
  {
    url: '/api/file/v1/fileUrl',
    type: 'get',
    response: config => {
      const url = 'http://xitianqujing.oss-cn-hangzhou.aliyuncs.com/8f1d3b29-7f2a-4afb-9f97-c6d1d37e23ee.pdf';
      return {
        code: 20000,
        data: url
      };
    }
  },
  {
    url: '/api/file/v1/ESignatureSealData',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          data: base64,
          msg: 'success'
        }
      };
    }
  },
  {
    url: '/api/file/v1/sealTheObject',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: {
          flag: true,
          msg: 'success'
        }
      };
    }
  }
];
