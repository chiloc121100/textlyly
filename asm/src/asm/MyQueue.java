package asm;

public class MyQueue {
	private Node head;
	private Node tail;
	public void Queue() {
		head = tail = null;
	}
	public boolean isEmpty() {
		return(head == null);
	}
	public void enQueue (String x) {
		Node n = new Node (x);
		if (isEmpty()) {
			head = tail = n;
			return;
		}
		tail.next = n;
		tail = tail.next;
	}
	public String deQueue() throws Exception {
		if (isEmpty()) throw new Exception("Cannot delete from empty Queue");
		String x = head.data;
		if(head == tail) {
			head = tail = null;
			return x;
		}
		head = head.next;
		return x;
	}
}
