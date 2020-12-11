public class operatorTest {
    public static void main(String[] args) { 
        //模运算，取余数
        int a = 5%3;
        System.out.println(a);
        //b++与++b
        int b = 1;
        int c = b++;//int c = b,b+=1;
        System.out.println("c="+c);
        System.out.println("b="+b);
        int d = ++b;//b+=1,int d = b;
        System.out.println("d="+d);
        System.out.println("b="+b);
        //char范围0-65535，输入(int)强制转换为int类型
        char e = 'z';
        System.out.println((int)e);
        /* 逻辑运算符
        与，&，两者为true返回true否则false
        短路与，&&，第一个true直接返回true，否则继续
        或，|，有一个true返回true，否则false
        短路或，||，第一个true直接返回true，否则继续
        非，!，相反值，!true为false，!false为true
        异或，^，两者相同为false，不相同为true
        */
    }
}