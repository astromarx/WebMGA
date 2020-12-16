/* xComplexityMax = 12
   xComplexityMin = 4

   yComplexityMax = 4
   yComplexityMin = 0

   modelLevels = 6 
   how many levels of detail we have




*/


void Renderer::createModels1(int index)
{
    //cout << "Renderer::createModels1() beg" << endl;    
    // simple Model
    
    float modelXScale = objectParams.at(index).at(1);
    float modelYScale = objectParams.at(index).at(2);
    float modelZScale = objectParams.at(index).at(3);
    

    //draws line (for simplified view)

    modelListSimpleIndex.at(index) = glGenLists(1);
    glNewList(modelListSimpleIndex.at(index), GL_COMPILE);
    glBegin(GL_LINES);
    glVertex3f(0, 0,  modelZScale );
    glVertex3f(0, 0, -modelZScale );
    glEnd();
    glEndList();
    
    modelListIndex.at(index) = glGenLists(modelLevels);
    
    if( objectParams.at(index).at(12) != 0 )
    {
	createModels1Wireframe(index);
	return;
    }
    
    for( int actLev = 0; actLev < modelLevels; ++actLev )
    {
	int actXCompl = (int) ( modelXComplexity_max + actLev * ((modelXComplexity_min - modelXComplexity_max) / (modelLevels - 1.0)) );
	int actYCompl = (int) ( modelYComplexity_max + actLev * ((modelYComplexity_min - modelYComplexity_max) / (modelLevels - 1.0)) );
	
	glNewList(modelListIndex.at(index) + actLev, GL_COMPILE);
	float yPiece = (float) (M_PI / ((actYCompl + 1) * 2));
	float xPiece = (float) (2 * M_PI / actXCompl);
	float fv[3];
	
	glBegin(GL_TRIANGLE_STRIP);
	for( int i = 0; i < actYCompl * 2; ++i )
	{
	    for( int j = 0; j < actXCompl + 1; ++j )
	    {
		// Oben
		if( j == 0 || j == actXCompl )
		{
		    fv[0] = (float) ( -modelXScale * sin((i + 1) * yPiece) );
		    fv[1] = 0;
		}
		else
		{
		    fv[0] =  (float) ( -cos(j * xPiece) * modelXScale * sin((i + 1) * yPiece) );
		    fv[1] = -(float) (  sin(j * xPiece) * modelYScale * sin((i + 1) * yPiece) );
		}
		fv[2] = (float) ( cos((i + 1) * yPiece) * modelZScale );
		
		glNormal3fv( normalizeV(fv, modelXScale, modelYScale, modelZScale) );
		glVertex3fv(fv);
		
		// Unten
		if( j == 0 || j == actXCompl )
		{
		    fv[0] = (float) ( -modelXScale * sin((i + 2) * yPiece) );
		    fv[1] = 0;
		}
		else
		{
		    fv[0] =  (float) ( -cos(j * xPiece) * modelXScale * sin((i + 2) * yPiece) );
		    fv[1] = -(float) (  sin(j * xPiece) * modelYScale * sin((i + 2) * yPiece) );
		}
		fv[2] = (float) ( cos((i + 2) * yPiece) * modelZScale );
		
		glNormal3fv( normalizeV(fv, modelXScale, modelYScale, modelZScale) );
		glVertex3fv(fv);
	    }
	}
	glEnd();
	
	// OBEN
	glBegin(GL_TRIANGLE_FAN);
	fv[0] = 0;
	fv[1] = 0;
	fv[2] = modelZScale;
	
	glNormal3fv( normalizeV(fv, modelXScale, modelYScale, modelZScale) );
	glVertex3fv(fv);
	
	for( int j = 0; j < actXCompl + 1; ++j )
	{
	    if( j == 0 || j == actXCompl )
	    {
		fv[0] = (float) ( -modelXScale * sin(yPiece) );
		fv[1] = 0;
	    }
	    else
	    {
		fv[0] =  (float) ( -cos(j * xPiece) * modelXScale * sin(yPiece) );
		fv[1] = -(float) (  sin(j * xPiece) * modelYScale * sin(yPiece) );
	    }
	    fv[2] = (float) ( cos(yPiece) * modelZScale );
	    
	    glNormal3fv( normalizeV(fv, modelXScale, modelYScale, modelZScale) );
	    glVertex3fv(fv);
	}
	glEnd();
	
	// UNTEN
	glBegin(GL_TRIANGLE_FAN);
	fv[0] = 0;
	fv[1] = 0;
	fv[2] = -modelZScale;
	
	glNormal3fv( normalizeV(fv, modelXScale, modelYScale, modelZScale) );
	glVertex3fv(fv);
	
	for( int j = actXCompl; j >= 0; --j )
	{
	    if( j == 0 || j == actXCompl )
	    {
		fv[0] = (float) ( -modelXScale * sin(yPiece) );
		fv[1] = 0;
	    }
	    else
	    {
		fv[0] =  (float) ( -cos(j * xPiece) * modelXScale * sin(yPiece) );
		fv[1] = -(float) (  sin(j * xPiece) * modelYScale * sin(yPiece) );
	    }
	    fv[2] = (float) ( -cos(yPiece) * modelZScale );
	    
	    glNormal3fv( normalizeV(fv, modelXScale, modelYScale, modelZScale) );
	    glVertex3fv(fv);
	}
	glEnd();
	
	glEndList();
    }
    //cout << "Renderer::createModels1() end" << endl;    
}


  //top
            // vertices.push(0.0);
            // vertices.push(0.0);
            // vertices.push(m.scale[Z]);
            // for(var j = 0; j < actComplexity[X]+1; ++j){
            //     if( j == 0 || j == actComplexity[X] ){
            //         vertices.push(-m.scale[X] * Math.sin(piece[Y]));
            //         vertices.push(0.0);
            //     }
            //     else
            //     {
            //         vertices.push(-Math.cos(j * piece[X]) * m.scale[X] * Math.sin(piece[Y]));
            //         vertices.push(-Math.sin(j * piece[X]) * m.scale[Y] * Math.sin(piece[Y]));
            //     }
            //     vertices.push(Math.cos(piece[Y]) * m.scale[Z]);
            // }

            //bottom
            // vertices.push(0.0);
            // vertices.push(0.0);
            // vertices.push(-m.scale[Z]);
            // for(var j = actComplexity[X]; j <= 0; --j){
            //     if( j == 0 || j == actComplexity[X] ){
            //         vertices.push(-m.scale[X] * Math.sin(piece[Y]));
            //         vertices.push(0.0);
            //     }
            //     else
            //     {
            //         vertices.push(-Math.cos(j * piece[X]) * m.scale[X] * Math.sin(piece[Y]));
            //         vertices.push(-Math.sin(j * piece[X]) * m.scale[Y] * Math.sin(piece[Y]));
            //     }
            //     vertices.push(-Math.cos(piece[Y]) * m.scale[Z]);
            //    }