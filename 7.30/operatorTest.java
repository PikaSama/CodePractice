public class operatorTest {
    public static void main(String[] args) { 
        //ģ���㣬ȡ����
        int a = 5%3;
        System.out.println(a);
        //b++��++b
        int b = 1;
        int c = b++;//int c = b,b+=1;
        System.out.println("c="+c);
        System.out.println("b="+b);
        int d = ++b;//b+=1,int d = b;
        System.out.println("d="+d);
        System.out.println("b="+b);
        //char��Χ0-65535������(int)ǿ��ת��Ϊint����
        char e = 'z';
        System.out.println((int)e);
        /* �߼������
        �룬&������Ϊtrue����true����false
        ��·�룬&&����һ��trueֱ�ӷ���true���������
        ��|����һ��true����true������false
        ��·��||����һ��trueֱ�ӷ���true���������
        �ǣ�!���෴ֵ��!trueΪfalse��!falseΪtrue
        ���^��������ͬΪfalse������ͬΪtrue
        */
    }
}