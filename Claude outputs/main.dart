// a) Fetch data from a REST API.
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
      home: ApiExample(),
    );
  }
}

class ApiExample extends StatefulWidget {
  const ApiExample({super.key});

  @override
  State<ApiExample> createState() => _ApiExampleState();
}

class _ApiExampleState extends State<ApiExample> {
  String data = 'Loading...';

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<void> fetchData() async {
    try {
      final response = await http
          .get(Uri.parse('https://jsonplaceholder.typicode.com/todos/1'))
          .timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);
        setState(() {
          data = jsonData['title'];
        });
      } else {
        setState(() {
          data = 'Failed to load data (Error ${response.statusCode})';
        });
      }
    } catch (e) {
      setState(() {
        data = 'Could not connect. Check your internet connection.';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Fetch API Data')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Text(
            data,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 20),
          ),
        ),
      ),
    );
  }
}
