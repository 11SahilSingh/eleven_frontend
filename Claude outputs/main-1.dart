// b) Display the fetched data in a meaningful way in the UI.
// Place this file at: lib/main.dart

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: ApiListExample(),
    );
  }
}

class ApiListExample extends StatefulWidget {
  const ApiListExample({super.key});

  @override
  State<ApiListExample> createState() => _ApiListExampleState();
}

class _ApiListExampleState extends State<ApiListExample> {
  List todos = [];
  bool loading = true;
  String? error;

  @override
  void initState() {
    super.initState();
    fetchTodos();
  }

  Future<void> fetchTodos() async {
    setState(() {
      loading = true;
      error = null;
    });

    try {
      final response = await http
          .get(Uri.parse('https://jsonplaceholder.typicode.com/todos'))
          .timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        setState(() {
          todos = json.decode(response.body);
          loading = false;
        });
      } else {
        setState(() {
          error = 'Failed to load data (Error ${response.statusCode})';
          loading = false;
        });
      }
    } catch (e) {
      setState(() {
        error = 'Could not connect. Check your internet connection.';
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final completed = todos.where((t) => t['completed'] == true).length;

    return Scaffold(
      appBar: AppBar(title: const Text('To-Do List')),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : error != null
              ? Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(error!, style: const TextStyle(fontSize: 16)),
                      const SizedBox(height: 12),
                      ElevatedButton(
                        onPressed: fetchTodos,
                        child: const Text('Retry'),
                      ),
                    ],
                  ),
                )
              : RefreshIndicator(
                  onRefresh: fetchTodos,
                  child: ListView.builder(
                    itemCount: todos.length + 1,
                    itemBuilder: (context, index) {
                      // Summary card at the top
                      if (index == 0) {
                        return Card(
                          color: Colors.blue.shade50,
                          margin: const EdgeInsets.all(12),
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                              children: [
                                Text('Total: ${todos.length}',
                                    style: const TextStyle(fontSize: 16)),
                                Text('Completed: $completed',
                                    style: const TextStyle(
                                        fontSize: 16, color: Colors.green)),
                                Text('Pending: ${todos.length - completed}',
                                    style: const TextStyle(
                                        fontSize: 16, color: Colors.red)),
                              ],
                            ),
                          ),
                        );
                      }

                      final todo = todos[index - 1];
                      final bool done = todo['completed'];

                      return Card(
                        margin: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 4),
                        child: ListTile(
                          leading: CircleAvatar(child: Text('${todo['id']}')),
                          title: Text(
                            todo['title'],
                            style: TextStyle(
                              decoration:
                                  done ? TextDecoration.lineThrough : null,
                            ),
                          ),
                          subtitle: Text('User ID: ${todo['userId']}'),
                          trailing: done
                              ? const Icon(Icons.check_circle,
                                  color: Colors.green)
                              : const Icon(Icons.cancel, color: Colors.red),
                        ),
                      );
                    },
                  ),
                ),
    );
  }
}
