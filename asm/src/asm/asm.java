package asm;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

import asm.MyQueue;

public class asm {
	MyStack processStack = new MyStack(100);
	MyQueue transferQueue = new MyQueue();
	public void menu() {
		String choice = "";
		while (!"0".equals(choice)) {
			Scanner sc = new Scanner(System.in);
			
			System.out.println("1.Send Messafes");
			System.out.println("2.Show All Messages");
			System.out.println("0.Exit");
			
			System.out.println("====Please input your choice===");
			choice = sc.nextLine();
			switch (choice) {
				case "1":
					transfer();
					break;
				case "2":
					process();
					break;
				case "0":
					System.exit(0);
			}
		}
	}
	
	private void transfer() {
		Scanner sc = new Scanner(System.in);
		MyQueue queue = new MyQueue();
				System.out.println("Transfering ....");
				String messages;
				do {
					messages = sc.nextLine();
					if (!messages.equals("Finish")) {
						transferQueue.enQueue(messages);
					}
				}
				while (!messages.equals("Finish"));
				while (!transferQueue.isEmpty()) {
					try {
						String x = transferQueue.deQueue();
						processStack.push(x);
						System.out.print("Messages: " + x + " ");
					} catch (Exception ex) {
						Logger.getLogger(asm.class.getName()).log(Level.SEVERE, null, ex);
					}
				}
	}
	
	private void process() {
		System.out.println("Processing ...");
		while (!processStack.isEmpty()) {
			try {
				System.out.println("Messages " + processStack.pop());
			}catch (Exception ex) {
				
			}
		}
	}
	
	public static void main (String[] args) {
		asm Asm = new asm();
		Asm.menu();
	}
}
