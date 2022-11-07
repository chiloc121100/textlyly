package asm;

public class MyStack {
	private String[] arr;
	private int top;
	private int max;
	
	public MyStack(int max) {
		this.max = max;
		arr = new String [max];
		top = -1;
	}
	public boolean isEmpty() {
		return top == -1;
	}
	public void push (String x) {
		if (top == max -1) {
			System.out.println("The Stack is full, cannot push");
			return;
		}
		arr[top++] = x;
	}
	public String pop ()throws Exception {
		if (isEmpty())
			throw new Exception ("Cannot pop from an empty stacks");
		String x = arr [top];
		top--;
		return x;
	}
}
