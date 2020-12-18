	float radius    = objectParams.at(index).at(4);
    float cylLength = objectParams.at(index).at(5);
    
    float fv[3];
    for( int actLev = 0; actLev < modelLevels; ++actLev )
    {
	glNewList( modelListIndex.at(index) + actLev, GL_COMPILE );
	
	int xCompl = (int) ( modelXComplexity_max + actLev * ( (modelXComplexity_min - modelXComplexity_max) / (modelLevels - 1.0) ) );
	int yCompl = xCompl/4;
	
	float xPiece = M_PI*2 /  xCompl;
	float yPiece = M_PI*2 / (yCompl*4);
	
	for( int yEbene = 0; yEbene < (yCompl-1); ++yEbene )
	{
	    glBegin(GL_TRIANGLE_STRIP);
	    for( int xPart = 0; xPart <= xCompl; ++xPart ) 
	    {
		if( xPart == 0 || xPart == xCompl ) 
		{
		    fv[0] = (float) ( -1 * sin((yEbene + 1) * yPiece) ) * radius ;
		    fv[1] = 0;
		} 
		else
		{
		    fv[0] =  (float) ( -cos(xPart  * xPiece) * sin((yEbene + 1) * yPiece) ) * radius;
		    fv[1] = -(float) (  sin(xPart  * xPiece) * sin((yEbene + 1) * yPiece) ) * radius;
		}
		fv[2] = (float) ( cos((yEbene + 1) * yPiece) ) * radius;
		
		glNormal3fv( normalizeV(fv, 1, 1, 1) );
		fv[2] += cylLength/2;
		glVertex3fv(fv);
		
		// Unten
		if( xPart == 0 || xPart == xCompl )
		{
		    fv[0] = (float) ( -1 * sin((yEbene+2) * yPiece) ) * radius;
		    fv[1] = 0;
		}
		else
		{
		    fv[0] =  (float) ( -cos(xPart * xPiece) * sin((yEbene + 2) * yPiece) ) * radius;
		    fv[1] = -(float) (  sin(xPart * xPiece) * sin((yEbene + 2) * yPiece) ) * radius;
		}
		fv[2] = (float) ( cos((yEbene+2) * yPiece) ) * radius;
		
		glNormal3fv( normalizeV(fv, 1, 1, 1) );
		fv[2] += cylLength/2;
		glVertex3fv(fv);
	    }
	    glEnd();
	}
	
	glBegin(GL_TRIANGLE_STRIP);
	for( int xPart = 0; xPart <= xCompl; ++xPart ) 
	{
	    if( xPart == 0 || xPart == xCompl ) 
	    {
		fv[0] = -1 * radius;
		fv[1] = 0;
	    }
	    else
	    {
		fv[0] =  (float) ( -cos(xPart * xPiece) ) * radius;
		fv[1] = -(float) (  sin(xPart * xPiece) ) * radius;
	    }
	    fv[2] = 0;
	    
	    glNormal3fv( normalizeV(fv, 1, 1, 1) );
	    fv[2] += cylLength/2;
	    glVertex3fv(fv);
	    
	    fv[2] = 0;
	    glNormal3fv( normalizeV(fv, 1, 1, 1) );
	    fv[2] -= cylLength/2;
	    glVertex3fv(fv);
	}
	glEnd();
	
	for( int yEbene = yCompl-1; yEbene < 2*(yCompl-1); ++yEbene ) 
	{
	    glBegin(GL_TRIANGLE_STRIP);
	    for( int xPart = 0; xPart <= xCompl; ++xPart ) 
	    {
		if( xPart  == 0 || xPart  == xCompl ) 
		{
		    fv[0] = (float) ( -1 * sin((yEbene + 1) * yPiece) ) * radius;
		    fv[1] = 0;
		} 
		else
		{
		    fv[0] =  (float) ( -cos(xPart  * xPiece) * sin((yEbene + 1) * yPiece) ) * radius;
		    fv[1] = -(float) (  sin(xPart  * xPiece) * sin((yEbene + 1) * yPiece) ) * radius;
		}
		fv[2] = (float) ( cos((yEbene  + 1) * yPiece) ) * radius;
		
		glNormal3fv( normalizeV(fv, 1, 1, 1) );
		fv[2] -= cylLength/2;
		glVertex3fv(fv);
		
		// Unten
		if( xPart == 0 || xPart == xCompl )
		{
		    fv[0] = (float) ( -1 * sin((yEbene+2) * yPiece) ) * radius;
		    fv[1] = 0;
		} 
		else 
		{
		    fv[0] =  (float) ( -cos(xPart * xPiece) * sin((yEbene + 2) * yPiece) ) * radius;
		    fv[1] = -(float) (  sin(xPart * xPiece) * sin((yEbene + 2) * yPiece) ) * radius;
		}
		fv[2] = (float) ( cos((yEbene + 2) * yPiece) ) * radius;
		
		glNormal3fv( normalizeV(fv, 1, 1, 1) );
		fv[2] -= cylLength/2;
		glVertex3fv(fv);
	    }
	    glEnd();
	}
	
	// OBEN
	glBegin(GL_TRIANGLE_FAN);
	fv[0] = 0;
	fv[1] = 0;
	fv[2] = radius;
	
	glNormal3fv( normalizeV(fv, 1, 1, 1) );
	fv[2] += cylLength/2;
	glVertex3fv(fv);
	
	for( int j = 0; j <=  xCompl; ++j )
	{
	    if( j == 0 || j == xCompl )
	    {
		fv[0] = (float) ( - sin(yPiece) * radius );
		fv[1] = 0;
	    }
	    else
	    {
		fv[0] =  (float) ( - cos(j * xPiece) * sin(yPiece) * radius );
		fv[1] = -(float) (   sin(j * xPiece) * sin(yPiece) * radius );
	    }
	    fv[2] = (float) ( cos(yPiece) * radius );
	    
	    glNormal3fv( normalizeV(fv, 1, 1, 1) );
	    fv[2] += cylLength/2;
	    glVertex3fv(fv);
	}
	glEnd();
	
	// UNTEN
	glBegin(GL_TRIANGLE_FAN);
	fv[0] = 0;
	fv[1] = 0;
	fv[2] = -radius;
	
	glNormal3fv( normalizeV(fv, 1, 1, 1) );
	fv[2] -= cylLength/2;
	glVertex3fv(fv);
	
	for( int j = xCompl; j >= 0; --j )
	{
	    if( j == 0 || j == xCompl )
	    {
		fv[0] = (float) ( -1 * sin(yPiece) * radius );
		fv[1] = 0;
	    } 
	    else
	    {
		fv[0] =  (float) ( -cos(j * xPiece) * sin(yPiece) * radius );
		fv[1] = -(float) (  sin(j * xPiece) * sin(yPiece) * radius );
	    }
	    fv[2] = (float) ( -cos(yPiece) * radius );
	    
	    glNormal3fv( normalizeV(fv, 1, 1, 1) );
	    fv[2] -= cylLength/2;
	    glVertex3fv(fv);
	}
	glEnd();
	
	glEndList();
    }
    //cout << "Renderer::createModels2() end" << endl;    