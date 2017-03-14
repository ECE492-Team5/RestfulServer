/*
generateJSON.c

Written by: Jiawei Wu of ECE492 group 5
Date: 02/03/2017

Native C file that generates the JSON file and saves it to disk,
allowing the server to access said files. 

At the moment, this file simply generates random values.
Once the sensors have been set up, it will use the sensor
value and output it into a JSON format.

New files are generated every second, file creation
is atomic and thread safe.
*/
#include <json/json.h>
#include <stdio.h>
#include <time.h>
#include <unistd.h>

void get_date(char date_buffer[]) {
	time_t timer;
	struct tm* tm_info;

	time(&timer);
	tm_info = localtime(&timer);

	strftime(date_buffer, 30, "%Y-%m-%dT%H:%M:%S", tm_info);
	printf("Date: %s\n", date_buffer);
}

int randomInt(double start_double) {

	int start_value = start_double * 15;
	int random_int = rand() % 2;

	if (random_int && start_value < 15) {
		start_value++;
	} 
	else if (!random_int && start_value > 0) {
		start_value--;
	}

	return start_value;
}

int main() {

	double sensor_1_data = 1;
	double sensor_2_data = 1;
	double sensor_3_data = 1;
	double sensor_4_data = 1;
	double sensor_5_data = 1;
	double sensor_6_data = 1;
	double sensor_7_data = 1;
	double sensor_8_data = 1;
	
	char date_buffer[30];
	srand(time(NULL));

	FILE *fp_sensor_1;
	FILE *fp_sensor_2;
	FILE *fp_sensor_3;
	FILE *fp_sensor_4;
	FILE *fp_sensor_5;
	FILE *fp_sensor_6;
	FILE *fp_sensor_7;
	FILE *fp_sensor_8;

	json_object *j_sensor_1_ID_int = json_object_new_int(1);
	json_object *j_sensor_2_ID_int = json_object_new_int(2);
	json_object *j_sensor_3_ID_int = json_object_new_int(3);
	json_object *j_sensor_4_ID_int = json_object_new_int(4);
	json_object *j_sensor_5_ID_int = json_object_new_int(5);
	json_object *j_sensor_6_ID_int = json_object_new_int(6);
	json_object *j_sensor_7_ID_int = json_object_new_int(7);
	json_object *j_sensor_8_ID_int = json_object_new_int(8);

	while(1) {
		get_date(date_buffer);
		int temp = randomInt(sensor_1_data);
		sensor_1_data = (double)temp/15;
		sensor_2_data = (double)randomInt(sensor_2_data)/15;
		sensor_3_data = (double)randomInt(sensor_3_data)/15;
		sensor_4_data = (double)randomInt(sensor_4_data)/15;
		sensor_5_data = (double)randomInt(sensor_5_data)/15;
		sensor_6_data = (double)randomInt(sensor_6_data)/15;
		sensor_7_data = (double)randomInt(sensor_7_data)/15;
		sensor_8_data = (double)randomInt(sensor_8_data)/15;
		printf("Sensor 1 Data: %d\n", temp);
		printf("Sensor 1 Data: %lf\n", sensor_1_data);

		json_object *j_sensor_1_obj = json_object_new_object();
		json_object *j_sensor_2_obj = json_object_new_object();
		json_object *j_sensor_3_obj = json_object_new_object();
		json_object *j_sensor_4_obj = json_object_new_object();
		json_object *j_sensor_5_obj = json_object_new_object();
		json_object *j_sensor_6_obj = json_object_new_object();
		json_object *j_sensor_7_obj = json_object_new_object();
		json_object *j_sensor_8_obj = json_object_new_object();

		json_object *j_sensor_1_current_float = json_object_new_double(sensor_1_data);
		json_object *j_sensor_2_current_float = json_object_new_double(sensor_2_data);
		json_object *j_sensor_3_current_float = json_object_new_double(sensor_3_data);
		json_object *j_sensor_4_current_float = json_object_new_double(sensor_4_data);
		json_object *j_sensor_5_current_float = json_object_new_double(sensor_5_data);
		json_object *j_sensor_6_current_float = json_object_new_double(sensor_6_data);
		json_object *j_sensor_7_current_float = json_object_new_double(sensor_7_data);
		json_object *j_sensor_8_current_float = json_object_new_double(sensor_8_data);

		json_object *j_sensor_1_unit = json_object_new_string("V");
		json_object *j_sensor_2_unit = json_object_new_string("V");
		json_object *j_sensor_3_unit = json_object_new_string("V");
		json_object *j_sensor_4_unit = json_object_new_string("V");
		json_object *j_sensor_5_unit = json_object_new_string("A");
		json_object *j_sensor_6_unit = json_object_new_string("A");
		json_object *j_sensor_7_unit = json_object_new_string("A");
		json_object *j_sensor_8_unit = json_object_new_string("A");

		json_object *j_date_string = json_object_new_string(date_buffer);



		json_object_object_add(j_sensor_1_obj, "Sensor_ID" , j_sensor_1_ID_int);
		json_object_object_add(j_sensor_1_obj, "Current" , j_sensor_1_current_float);
		json_object_object_add(j_sensor_1_obj, "Date" , j_date_string);
		json_object_object_add(j_sensor_1_obj, "Unit" , j_sensor_1_unit);

		json_object_object_add(j_sensor_2_obj, "Sensor_ID" , j_sensor_2_ID_int);
		json_object_object_add(j_sensor_2_obj, "Current" , j_sensor_2_current_float);
		json_object_object_add(j_sensor_2_obj, "Date" , j_date_string);
		json_object_object_add(j_sensor_2_obj, "Unit" , j_sensor_2_unit);

		json_object_object_add(j_sensor_3_obj, "Sensor_ID" , j_sensor_3_ID_int);
		json_object_object_add(j_sensor_3_obj, "Current" , j_sensor_3_current_float);
		json_object_object_add(j_sensor_3_obj, "Date" , j_date_string);
		json_object_object_add(j_sensor_3_obj, "Unit" , j_sensor_3_unit);

		json_object_object_add(j_sensor_4_obj, "Sensor_ID" , j_sensor_4_ID_int);
		json_object_object_add(j_sensor_4_obj, "Current" , j_sensor_4_current_float);
		json_object_object_add(j_sensor_4_obj, "Date" , j_date_string);
		json_object_object_add(j_sensor_4_obj, "Unit" , j_sensor_4_unit);

		json_object_object_add(j_sensor_5_obj, "Sensor_ID" , j_sensor_5_ID_int);
		json_object_object_add(j_sensor_5_obj, "Current" , j_sensor_5_current_float);
		json_object_object_add(j_sensor_5_obj, "Date" , j_date_string);
		json_object_object_add(j_sensor_5_obj, "Unit" , j_sensor_5_unit);

		json_object_object_add(j_sensor_6_obj, "Sensor_ID" , j_sensor_6_ID_int);
		json_object_object_add(j_sensor_6_obj, "Current" , j_sensor_6_current_float);
		json_object_object_add(j_sensor_6_obj, "Date" , j_date_string);
		json_object_object_add(j_sensor_6_obj, "Unit" , j_sensor_6_unit);

		json_object_object_add(j_sensor_7_obj, "Sensor_ID" , j_sensor_7_ID_int);
		json_object_object_add(j_sensor_7_obj, "Current" , j_sensor_7_current_float);
		json_object_object_add(j_sensor_7_obj, "Date" , j_date_string);
		json_object_object_add(j_sensor_7_obj, "Unit" , j_sensor_7_unit);

		json_object_object_add(j_sensor_8_obj, "Sensor_ID" , j_sensor_8_ID_int);
		json_object_object_add(j_sensor_8_obj, "Current" , j_sensor_8_current_float);
		json_object_object_add(j_sensor_8_obj, "Date" , j_date_string);
		json_object_object_add(j_sensor_8_obj, "Unit" , j_sensor_8_unit);


		fp_sensor_1 = fopen("./sensors/sensor_1~.json", "w");
		if (fp_sensor_1 == NULL) {
			fprintf(stderr, "Can't Open File sensor_1\n");
			exit(1);
		}
		fprintf(fp_sensor_1, "%s\n", 
			json_object_to_json_string_ext(j_sensor_1_obj, JSON_C_TO_STRING_PRETTY));
		fclose(fp_sensor_1);



		fp_sensor_2 = fopen("./sensors/sensor_2~.json", "w");
		if (fp_sensor_2 == NULL) {
			fprintf(stderr, "Can't Open File sensor_2\n");
			exit(1);
		}
		fprintf(fp_sensor_2, "%s\n", 
			json_object_to_json_string_ext(j_sensor_2_obj, JSON_C_TO_STRING_PRETTY));
		fclose(fp_sensor_2);



		fp_sensor_3 = fopen("./sensors/sensor_3~.json", "w");
		if (fp_sensor_3 == NULL) {
			fprintf(stderr, "Can't Open File sensor_3\n");
			exit(1);
		}
		fprintf(fp_sensor_3, "%s\n", 
			json_object_to_json_string_ext(j_sensor_3_obj, JSON_C_TO_STRING_PRETTY));
		fclose(fp_sensor_3);



		fp_sensor_4 = fopen("./sensors/sensor_4~.json", "w");
		if (fp_sensor_4 == NULL) {
			fprintf(stderr, "Can't Open File sensor_4\n");
			exit(1);
		}
		fprintf(fp_sensor_4, "%s\n", 
			json_object_to_json_string_ext(j_sensor_4_obj, JSON_C_TO_STRING_PRETTY));
		fclose(fp_sensor_4);



		fp_sensor_5 = fopen("./sensors/sensor_5~.json", "w");
		if (fp_sensor_5 == NULL) {
			fprintf(stderr, "Can't Open File sensor_5\n");
			exit(1);
		}
		fprintf(fp_sensor_5, "%s\n", 
			json_object_to_json_string_ext(j_sensor_5_obj, JSON_C_TO_STRING_PRETTY));
		fclose(fp_sensor_5);



		fp_sensor_6 = fopen("./sensors/sensor_6~.json", "w");
		if (fp_sensor_6 == NULL) {
			fprintf(stderr, "Can't Open File sensor_6\n");
			exit(1);
		}
		fprintf(fp_sensor_6, "%s\n", 
			json_object_to_json_string_ext(j_sensor_6_obj, JSON_C_TO_STRING_PRETTY));
		fclose(fp_sensor_6);



		fp_sensor_7 = fopen("./sensors/sensor_7~.json", "w");
		if (fp_sensor_7 == NULL) {
			fprintf(stderr, "Can't Open File sensor_7\n");
			exit(1);
		}
		fprintf(fp_sensor_7, "%s\n", 
			json_object_to_json_string_ext(j_sensor_7_obj, JSON_C_TO_STRING_PRETTY));
		fclose(fp_sensor_7);



		fp_sensor_8 = fopen("./sensors/sensor_8~.json", "w");
		if (fp_sensor_8 == NULL) {
			fprintf(stderr, "Can't Open File sensor_8\n");
			exit(1);
		}
		fprintf(fp_sensor_8, "%s\n", 
			json_object_to_json_string_ext(j_sensor_8_obj, JSON_C_TO_STRING_PRETTY));
		fclose(fp_sensor_8);



		rename("./sensors/sensor_1~.json", "./sensors/sensor_1.json");
		rename("./sensors/sensor_2~.json", "./sensors/sensor_2.json");
		rename("./sensors/sensor_3~.json", "./sensors/sensor_3.json");
		rename("./sensors/sensor_4~.json", "./sensors/sensor_4.json");
		rename("./sensors/sensor_5~.json", "./sensors/sensor_5.json");
		rename("./sensors/sensor_6~.json", "./sensors/sensor_6.json");
		rename("./sensors/sensor_7~.json", "./sensors/sensor_7.json");
		rename("./sensors/sensor_8~.json", "./sensors/sensor_8.json");

		sleep(1);
	}
}
